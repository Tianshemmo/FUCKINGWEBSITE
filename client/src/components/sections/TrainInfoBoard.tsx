'use client';

import { useState, useEffect, useMemo } from 'react';
import { Clock, ArrowDown, ArrowUp } from 'lucide-react';

interface TrainInfo {
  direction: 'south' | 'north';
  time: string;
  minutesUntil: number;
  destination: string;
}

// 建議去台鐵官網或 APP 確認最新班次，這裡先修正邏輯
const TRAIN_SCHEDULE = [
  // 南下（往嘉義/潮州）
  { direction: 'south', time: '06:10', destination: '嘉義' },
  { direction: 'south', time: '07:15', destination: '嘉義' },
  { direction: 'south', time: '08:20', destination: '嘉義' },
  { direction: 'south', time: '09:25', destination: '嘉義' },
  { direction: 'south', time: '10:30', destination: '嘉義' },
  { direction: 'south', time: '11:35', destination: '嘉義' },
  { direction: 'south', time: '12:40', destination: '嘉義' },
  { direction: 'south', time: '13:45', destination: '嘉義' },
  { direction: 'south', time: '14:50', destination: '嘉義' },
  { direction: 'south', time: '15:55', destination: '嘉義' },
  { direction: 'south', time: '17:00', destination: '嘉義' },
  { direction: 'south', time: '18:05', destination: '嘉義' },
  { direction: 'south', time: '19:10', destination: '嘉義' },
  { direction: 'south', time: '20:15', destination: '嘉義' },
  { direction: 'south', time: '22:30', destination: '嘉義' }, // 增加末班車範例
  // 北上（往斗六/彰化）
  { direction: 'north', time: '06:25', destination: '斗六' },
  { direction: 'north', time: '07:30', destination: '斗六' },
  { direction: 'north', time: '08:35', destination: '斗六' },
  { direction: 'north', time: '09:40', destination: '斗六' },
  { direction: 'north', time: '10:45', destination: '斗六' },
  { direction: 'north', time: '11:50', destination: '斗六' },
  { direction: 'north', time: '12:55', destination: '斗六' },
  { direction: 'north', time: '14:00', destination: '斗六' },
  { direction: 'north', time: '15:05', destination: '斗六' },
  { direction: 'north', time: '16:10', destination: '斗六' },
  { direction: 'north', time: '17:15', destination: '斗六' },
  { direction: 'north', time: '18:20', destination: '斗六' },
  { direction: 'north', time: '19:25', destination: '斗六' },
  { direction: 'north', time: '21:30', destination: '斗六' },
];

export default function TrainInfoBoard() {
  // 使用 null 初始化避免 Hydration mismatch (伺服器與客戶端時間不一致)
  const [trains, setTrains] = useState<TrainInfo[] | null>(null);

  useEffect(() => {
    const updateTrains = () => {
      const now = new Date();
      // 直接使用 Date 的本地時間，這在使用者瀏覽器上最準確
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

      const calculateNextTrain = (direction: 'south' | 'north'): TrainInfo => {
        const schedule = TRAIN_SCHEDULE.filter(t => t.direction === direction);
        
        // 找到下一班
        let next = schedule.find(train => {
          const [h, m] = train.time.split(':').map(Number);
          return (h * 60 + m) > currentTotalMinutes;
        });

        // 如果今天沒車了，找明天的第一班
        if (!next) {
          const first = schedule[0];
          const [h, m] = first.time.split(':').map(Number);
          const minutesUntil = (24 * 60 - currentTotalMinutes) + (h * 60 + m);
          return { ...first, direction, minutesUntil };
        }

        const [h, m] = next.time.split(':').map(Number);
        return { ...next, direction, minutesUntil: (h * 60 + m) - currentTotalMinutes };
      };

      setTrains([calculateNextTrain('south'), calculateNextTrain('north')]);
    };

    updateTrains();
    const interval = setInterval(updateTrains, 30000); // 30秒更新一次
    return () => clearInterval(interval);
  }, []);

  // 如果還沒加載出時間，顯示加載中或空狀態
  if (!trains) return <div className="animate-pulse h-64 bg-muted rounded-lg" />;

  return (
    <div className="w-full">
      <div className="mb-8 text-center md:text-left">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          現在幾點？
        </h2>
        <p className="text-muted-foreground text-lg">
          下一班火車發車倒數
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trains.map(train => (
          <div
            key={train.direction}
            className="bg-white rounded-2xl border-2 border-secondary/20 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${train.direction === 'south' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {train.direction === 'south' ? (
                    <ArrowDown className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ArrowUp className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <span className="text-xl font-bold">
                  {train.direction === 'south' ? '南下' : '北上'}
                </span>
              </div>
              <span className="text-sm font-medium px-3 py-1 bg-muted rounded-full">
                往 {train.destination}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-2xl font-mono font-bold">
                <Clock className="w-5 h-5 text-muted-foreground" />
                {train.time}
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated</p>
                <p className="text-3xl font-black text-primary">
                  {train.minutesUntil} <span className="text-sm">min</span>
                </p>
              </div>
            </div>

            {/* 進度條改進：視覺上倒數感更強 */}
            <div className="mt-6 bg-secondary/10 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  train.minutesUntil < 10 ? 'bg-red-500 animate-pulse' : 'bg-primary'
                }`}
                style={{
                  width: `${Math.max(5, Math.min(100, (train.minutesUntil / 60) * 100))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
        <p className="text-amber-800 text-sm flex items-center gap-2">
          <span>💡</span>
          <span>時刻表僅供參考，實際發車時間請以 <b>台鐵官方公告</b> 或 <b>e訂通 APP</b> 為準。</span>
        </p>
      </div>
    </div>
  );
}