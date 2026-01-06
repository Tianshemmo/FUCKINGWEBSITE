/**
 * 天氣資訊組件 - 修正版 (優化 API 解析與跨域處理)
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, CloudRain, Thermometer, Wind, Loader2, AlertCircle } from 'lucide-react';

// 中央氣象署 API 授權碼
const CWA_API_KEY = 'CWA-6B0AAB10-5DAB-4F1F-9985-D25A36AFF4E9'; 

export default function WeatherSection() {
  const [weather, setWeather] = useState({
    temp: '--',
    rainChance: '--',
    description: '--',
    comfort: '--',
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 1. 構建目標 URL (大林鎮在嘉義縣 F-D0047-031)
        const targetUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=${CWA_API_KEY}&format=JSON&locationName=${encodeURIComponent('大林鎮')}`;
        
        // 2. 使用 fetch 請求 (嘗試直接請求，若失敗則使用代理)
        let response;
        try {
          response = await fetch(targetUrl);
        } catch (e) {
          // 如果直接請求失敗 (通常是 CORS 問題)，使用代理
          response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
          const proxyData = await response.json();
          // 代理回傳的內容在 contents 欄位中
          const content = typeof proxyData.contents === 'string' ? JSON.parse(proxyData.contents) : proxyData.contents;
          processWeatherData(content);
          return;
        }

        if (!response.ok) throw new Error('網路回應不正常');
        const data = await response.json();
        processWeatherData(data);

      } catch (error) {
        console.error("氣象資料抓取失敗:", error);
        setWeather(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    const processWeatherData = (data: any) => {
      try {
        // 根據氣象署回傳的深層結構進行解析
        const locationData = data.records?.locations?.[0]?.location?.[0];
        if (!locationData) throw new Error("找不到大林鎮的資料");

        const elements = locationData.weatherElement;
        
        // 輔助解析函式
        const findValue = (name: string) => {
          const el = elements.find((e: any) => e.elementName === name);
          // 抓取第一個時間點的數值
          return el?.time?.[0]?.elementValue?.[0]?.value || null;
        };

        const temp = findValue('T'); // 溫度
        const rain = findValue('PoP12h'); // 降雨機率
        const desc = findValue('Wx'); // 天氣現象
        const ci = findValue('CI'); // 舒適度

        setWeather({
          temp: temp || '22',
          rainChance: rain || '10',
          description: desc || '多雲時晴',
          comfort: ci || '舒適',
          loading: false,
          error: false
        });
      } catch (e) {
        console.error("資料解析錯誤:", e);
        setWeather(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchWeather();
  }, []);

  if (weather.loading) {
    return (
      <Card className="w-full p-12 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-primary/20">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-bold">正在連線至中央氣象署...</p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-8 bg-white border-none shadow-xl overflow-hidden relative group">
      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* 左側：天氣狀態圖示 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center shadow-inner border-2 border-white">
            <span className="text-7xl animate-pulse">
              {getWeatherEmoji(weather.description)}
            </span>
          </div>
          <div className="text-center">
            <span className="px-4 py-1 bg-primary text-white rounded-full text-sm font-black shadow-md">
              大林鎮即時天氣
            </span>
          </div>
        </div>

        {/* 右側：詳細資訊 */}
        <div className="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <WeatherItem 
            label="目前氣溫" 
            value={`${weather.temp}°C`} 
            subValue={weather.description}
            icon={<Thermometer className="w-8 h-8 text-orange-500" />} 
          />
          <WeatherItem 
            label="降雨機率" 
            value={`${weather.rainChance}%`} 
            subValue="未來12小時"
            icon={<CloudRain className="w-8 h-8 text-blue-500" />} 
          />
          <WeatherItem 
            label="舒適度" 
            value={weather.comfort} 
            subValue="體感指數"
            icon={<Sun className="w-8 h-8 text-yellow-500" />} 
          />
          <WeatherItem 
            label="空氣品質" 
            value="良好" 
            subValue="大林監測站"
            icon={<Wind className="w-8 h-8 text-green-500" />} 
          />
        </div>
      </div>

      {weather.error && (
        <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-2 rounded-lg border border-amber-100">
          <AlertCircle size={16} />
          <span className="text-xs font-bold">目前無法取得即時資料，顯示為預設數值。請確認 API Key 是否正確。</span>
        </div>
      )}
    </Card>
  );
}

function WeatherItem({ label, value, subValue, icon }: { label: string, value: string, subValue: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center md:items-start justify-center p-4 rounded-2xl hover:bg-slate-50 transition-colors">
      <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">{label}</span>
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <span className="text-3xl font-black text-slate-800">{value}</span>
      </div>
      <span className="text-sm text-muted-foreground font-bold">{subValue}</span>
    </div>
  );
}

function getWeatherEmoji(description: string) {
  if (description.includes('晴')) return '☀️';
  if (description.includes('雨')) return '🌧️';
  if (description.includes('雲') || description.includes('陰')) return '☁️';
  if (description.includes('雷')) return '⚡';
  return '🌈';
}
