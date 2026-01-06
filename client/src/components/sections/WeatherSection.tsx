import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, CloudRain, Thermometer, Wind, Loader2, Zap, CloudSun } from 'lucide-react';

const CWA_API_KEY = 'CWA-6B0AAB10-5DAB-4F1F-9985-D25A36AFF4E9';

export default function WeatherSection() {
  const [weather, setWeather] = useState({
    temp: '--',
    rainChance: '--',
    description: '--',
    uv: '--',
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 使用您目前的 URL
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=${CWA_API_KEY}&format=JSON&locationName=${encodeURIComponent('大林鎮')}`;
        const response = await fetch(url);
        const data = await response.json();

        const locationData = data.records?.Locations?.[0]?.Location?.[0];
        const elements = locationData?.WeatherElement || [];

        // 核心邏輯：支援多種可能的降雨欄位名稱與時段搜尋
        const findValue = (possibleNames: string[], valueKey: string) => {
          // 1. 先找出對應的元素（相容 12小時/6小時/降雨機率 等不同命名）
          const element = elements.find((el: any) => possibleNames.includes(el.ElementName));
          if (!element || !element.Time) return '--';

          // 2. 遍歷 Time 陣列找到第一個不是空的數值
          for (const slot of element.Time) {
            const val = slot.ElementValue?.[0]?.[valueKey];
            if (val !== undefined && val !== null && val.toString().trim() !== "" && val !== " ") {
              return val;
            }
          }
          return '--';
        };

        setWeather({
          temp: findValue(['平均溫度', '溫度'], 'Temperature'),
          // 同時找「降雨機率」與「12小時降雨機率」
          rainChance: findValue(['降雨機率', '12小時降雨機率', '6小時降雨機率'], 'ProbabilityOfPrecipitation'),
          description: findValue(['天氣現象'], 'Weather'),
          uv: findValue(['紫外線指數'], 'UVIndex'),
          loading: false,
          error: false
        });

      } catch (error) {
        console.error("抓取失敗:", error);
        setWeather(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchWeather();
  }, []);

  if (weather.loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2"/>大林鎮資料同步中...</div>;

  return (
    <Card className="w-full p-8 bg-white shadow-2xl rounded-3xl border-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <WeatherItem 
          label="目前氣溫" 
          value={`${weather.temp}°C`} 
          subValue="即時觀測"
          icon={<Thermometer className="text-orange-500" />} 
        />
        <WeatherItem 
          label="降雨機率" 
          value={weather.rainChance === '--' ? '--' : `${weather.rainChance}%`} 
          subValue="近期預報" 
          icon={<CloudRain className="text-blue-500" />} 
        />
        <WeatherItem 
          label="紫外線" 
          value={weather.uv} 
          subValue="曝曬指數"
          icon={<Zap className="text-yellow-400" />} 
        />
        <WeatherItem 
          label="天氣現象" 
          value={weather.description} 
          subValue="目前狀況"
          icon={<CloudSun className="text-sky-500" />} 
        />
      </div>
    </Card>
  );
}

function WeatherItem({ label, value, subValue, icon }: any) {
  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-all">
      <span className="text-[10px] text-slate-400 font-bold mb-3 tracking-widest uppercase">{label}</span>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xl font-black text-slate-800">{value}</span>
      </div>
      <span className="text-[10px] text-slate-500">{subValue}</span>
    </div>
  );
}