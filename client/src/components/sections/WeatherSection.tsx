/**
 * 天氣資訊組件 - 簡潔版 (移除底部描述)
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, CloudRain, Thermometer } from 'lucide-react';

const CWA_API_KEY = 'CWA-6B0AAB10-5DAB-4F1F-9985-D25A36AFF4E9';

export default function WeatherSection() {
  const [weather, setWeather] = useState({
    temp: '23',
    rainChance: '0',
    uvIndex: '普通',
    aqi: '普通',
    loading: true
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const timestamp = new Date().getTime();
        const targetUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=${CWA_API_KEY}&format=JSON&locationName=大林鎮&_=${timestamp}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        const proxyData = await response.json();
        const content = typeof proxyData.contents === 'string' ? JSON.parse(proxyData.contents) : proxyData.contents;

        if (content.success === "true" && content.records?.locations?.[0]?.location?.[0]) {
          const location = content.records.locations[0].location[0];
          const elements = location.weatherElement;

          const getDeepValue = (names: string[]) => {
            const el = elements.find((e: any) => names.includes(e.elementName));
            if (!el || !el.time) return null;
            for (const t of el.time) {
              const val = t.elementValue?.[0]?.value;
              if (val !== undefined && val !== null && val !== "" && val !== " ") return val;
            }
            return null;
          };

          setWeather({
            temp: getDeepValue(["T", "平均溫度"]) || '23',
            rainChance: getDeepValue(["PoP12h", "12小時降雨機率", "PoP6h"]) || '0',
            uvIndex: '普通',
            aqi: '普通',
            loading: false
          });
        }
      } catch (error) {
        console.error("解析失敗:", error);
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };

    fetchWeather();
  }, []);

  return (
    <Card className="w-full p-6 bg-white border-none shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* 左側：可愛插畫 */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
             <span className="text-6xl animate-bounce" style={{ animationDuration: '4s' }}>🏖️</span>
          </div>
          <div className="absolute -top-2 -left-2 text-4xl transform -rotate-12">👒</div>
        </div>

        {/* 右側：天氣資訊欄 */}
        <div className="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <WeatherItem label="今日氣溫" value={`${weather.temp}°C`} icon={<Thermometer className="w-8 h-8 text-orange-500" />} />
          <WeatherItem label="降雨機率" value={`${weather.rainChance}%`} icon={<CloudRain className="w-7 h-7 text-blue-400" />} />
          <WeatherItem label="紫外線指數" value={weather.uvIndex} icon={<Sun className="w-7 h-7 text-yellow-500" />} />
          <WeatherItem label="空氣品質" value={weather.aqi} icon={<div className="w-4 h-4 bg-green-400 rounded-full" />} />
        </div>
      </div>
    </Card>
  );
}

function WeatherItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center border-r-0 lg:border-r last:border-r-0 border-slate-50 px-4">
      <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 font-bold">{label}</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-2xl font-black text-slate-700">{value}</span>
      </div>
    </div>
  );
}