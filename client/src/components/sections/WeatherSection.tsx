/**
 * 天氣資訊組件 - 完整解析 CWA API 資料 (包含 UVI)
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, CloudRain, Thermometer, Loader2, ShieldCheck } from 'lucide-react';

// 使用你提供的 API 授權碼
const CWA_API_KEY = 'CWA-6B0AAB10-5DAB-4F1F-9985-D25A36AFF4E9';

export default function WeatherSection() {
  const [weather, setWeather] = useState({
    temp: '--',
    rainChance: '--',
    uvIndex: '--',
    aqi: '普通',
    description: '載入中...',
    loading: true
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 使用你提供的完整 Request URL 邏輯
        const weatherUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=${CWA_API_KEY}&format=JSON&LocationName=%E5%A4%A7%E6%9E%97%E9%8E%AE&ElementName=%E6%9C%80%E9%AB%98%E6%BA%AB%E5%BA%A6,%E5%A4%A9%E6%B0%A3%E9%A0%90%E5%A0%B1%E7%B6%9C%E5%90%88%E6%8F%8F%E8%BF%B0,%E5%B9%B3%E5%9D%87%E7%9B%B8%E5%B0%8D%E6%BF%95%E5%BA%A6,%E6%9C%80%E9%AB%98%E9%AB%94%E6%84%9F%E6%BA%AB%E5%BA%A6,12%E5%B0%8F%E6%99%82%E9%99%8D%E9%9B%A8%E6%A9%9F%E7%8E%87,%E9%A2%A8%E5%90%91,%E5%B9%B3%E5%9D%87%E9%9C%B2%E9%BB%9E%E6%BA%AB%E5%BA%A6,%E6%9C%80%E4%BD%8E%E9%AB%94%E6%84%9F%E6%BA%AB%E5%BA%A6,%E5%B9%B3%E5%9D%87%E6%BA%AB%E5%BA%A6,%E6%9C%80%E5%A4%A7%E8%88%92%E9%81%A9%E5%BA%A6%E6%8C%87%E6%95%B8,%E6%9C%80%E5%B0%8F%E8%88%92%E9%81%A9%E5%BA%A6%E6%8C%87%E6%95%B8,%E9%A2%A8%E9%80%9F,%E7%B4%AB%E5%A4%96%E7%B7%9A%E6%8C%87%E6%95%B8,%E5%A4%A9%E6%B0%A3%E7%8F%BE%E8%B1%A1,%E6%9C%80%E4%BD%8E%E6%BA%AB%E5%BA%A6`;
        
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        if (data.success === "true" && data.records.locations.length > 0) {
          const location = data.records.locations[0].location[0];
          const elements = location.weatherElement;

          // 提取資料
          const tempElement = elements.find((e: any) => e.elementName === "T" || e.elementName === "平均溫度");
          const rainElement = elements.find((e: any) => e.elementName === "PoP12h" || e.elementName === "12小時降雨機率");
          const descElement = elements.find((e: any) => e.elementName === "WeatherDescription" || e.elementName === "天氣預報綜合描述");
          const uviElement = elements.find((e: any) => e.elementName === "UVI" || e.elementName === "紫外線指數");

          // 紫外線指數描述轉換
          const getUviDesc = (val: string) => {
            const v = parseInt(val);
            if (isNaN(v)) return val || '普通';
            if (v <= 2) return '低量級';
            if (v <= 5) return '中量級';
            if (v <= 7) return '高量級';
            if (v <= 10) return '甚高量級';
            return '極高量級';
          };

          setWeather(prev => ({
            ...prev,
            temp: tempElement?.time[0]?.elementValue[0]?.value || '--',
            rainChance: rainElement?.time[0]?.elementValue[0]?.value || '--',
            uvIndex: getUviDesc(uviElement?.time[0]?.elementValue[0]?.value),
            description: descElement?.time[0]?.elementValue[0]?.value || '暫無描述',
            loading: false
          }));
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setWeather(prev => ({ ...prev, loading: false, description: '無法獲取天氣資訊' }));
      }
    };

    fetchWeather();
  }, []);

  if (weather.loading) {
    return (
      <Card className="w-full p-12 flex items-center justify-center bg-white/50 border-dashed border-2 border-slate-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-slate-500 font-medium">正在讀取大林鎮即時天氣...</span>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 bg-white border-none shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* 左側：可愛插畫 */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
             <span className="text-6xl animate-bounce" style={{ animationDuration: '4s' }}>🏖️</span>
          </div>
          <div className="absolute -top-2 -left-2 text-4xl transform -rotate-12 drop-shadow-sm">👒</div>
        </div>

        {/* 右側：天氣資訊欄 */}
        <div className="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* 今日氣溫 */}
          <div className="flex flex-col items-center justify-center border-r-0 lg:border-r border-slate-50 px-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 font-bold">今日氣溫</span>
            <div className="flex items-center gap-2">
              <Thermometer className="w-8 h-8 text-orange-500" />
              <span className="text-3xl font-black text-slate-700">{weather.temp}°C</span>
            </div>
          </div>

          {/* 降雨機率 */}
          <div className="flex flex-col items-center justify-center border-r-0 lg:border-r border-slate-50 px-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 font-bold">降雨機率</span>
            <div className="flex items-center gap-2">
              <CloudRain className="w-7 h-7 text-blue-400" />
              <span className="text-2xl font-bold text-slate-700">{weather.rainChance}%</span>
            </div>
          </div>

          {/* 紫外線指數 */}
          <div className="flex flex-col items-center justify-center border-r-0 lg:border-r border-slate-50 px-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 font-bold">紫外線指數</span>
            <div className="flex items-center gap-2">
              <Sun className="w-7 h-7 text-yellow-500" />
              <span className="text-xl font-bold text-slate-700">{weather.uvIndex}</span>
            </div>
          </div>

          {/* 空氣品質指標 */}
          <div className="flex flex-col items-center justify-center px-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 font-bold">空氣品質指標</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded-full shadow-sm"></div>
              <span className="text-xl font-bold text-slate-700">{weather.aqi}</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* 底部描述 */}
      <div className="mt-6 pt-4 border-t border-slate-50 text-center">
        <p className="text-xs text-slate-400 font-medium">
          <span className="bg-slate-100 px-2 py-0.5 rounded-full mr-2 text-[10px]">大林即時預報</span>
          {weather.description}
        </p>
      </div>
    </Card>
  );
}
