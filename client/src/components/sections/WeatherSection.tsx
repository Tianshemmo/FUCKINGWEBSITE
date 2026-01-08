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
    location: '--', // 用來確認目前抓到的地點
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=${CWA_API_KEY}&format=JSON&locationName=${encodeURIComponent('大林鎮')}`;
        const response = await fetch(url);
        const data = await response.json();

        // --- 關鍵修正：精確篩選大林鎮 ---
        const allLocations = data.records?.Locations?.[0]?.Location || [];
        // 確保抓到名稱為「大林鎮」的資料，若找不到則顯示警告
        const dalinData = allLocations.find((loc: any) => loc.LocationName === '大林鎮');
        
        if (!dalinData) {
          console.error("❌ 在 API 回傳中找不到「大林鎮」的資料，請檢查 URL 參數");
          throw new Error("找不到地點資料");
        }

        const elements = dalinData.WeatherElement || [];

        // --- Console 偵錯報表 ---
        console.group('%c 📍 氣象站定位確認 ', 'background: #222; color: #bada55; padding: 5px;');
        console.log(`目前抓取地點: %c${dalinData.LocationName}`, 'color: #ff9f43; font-weight: bold; font-size: 14px;');
        
        const findValueWithLog = (possibleNames: string[], valueKey: string) => {
          const element = elements.find((el: any) => possibleNames.includes(el.ElementName));
          if (!element) return '--';

          for (let i = 0; i < (element.Time?.length || 0); i++) {
            const val = element.Time[i].ElementValue?.[0]?.[valueKey];
            if (val !== undefined && val !== null && val.toString().trim() !== "") {
              console.log(`✅ %c${element.ElementName}%c -> %c${val}`, 'color: cyan', 'color: white', 'font-weight: bold; color: yellow');
              return val;
            }
          }
          return '--';
        };

        const results = {
          temp: findValueWithLog(['平均溫度', '溫度'], 'Temperature'),
          rainChance: findValueWithLog(['降雨機率', '12小時降雨機率', '6小時降雨機率'], 'ProbabilityOfPrecipitation'),
          description: findValueWithLog(['天氣現象'], 'Weather'),
          uv: findValueWithLog(['紫外線指數'], 'UVIndex'),
          location: dalinData.LocationName
        };

        console.table(results);
        console.groupEnd();

        setWeather({ ...results, loading: false, error: false });

      } catch (error) {
        console.error("抓取失敗:", error);
        setWeather(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchWeather();
  }, []);

  if (weather.loading) return <div className="p-10 text-center animate-pulse">📡 正在同步大林鎮氣象站...</div>;

  return (
    <Card className="w-full p-8 bg-white shadow-2xl rounded-3xl border-none">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {weather.location} 即時天氣預報
        </span>
      </div>

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
          subValue="預估降雨" 
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
          subValue="環境狀況"
          icon={<CloudSun className="text-sky-500" />} 
        />
      </div>
    </Card>
  );
}

function WeatherItem({ label, value, subValue, icon }: any) {
  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
      <span className="text-[10px] text-slate-400 font-bold mb-3 tracking-widest uppercase">{label}</span>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xl font-black text-slate-800">{value}</span>
      </div>
      <span className="text-[10px] text-slate-500 font-medium">{subValue}</span>
    </div>
  );
}