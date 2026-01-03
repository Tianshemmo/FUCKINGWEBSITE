/**
 * 即時列車資訊看板
 * 顯示距離下一班南下/北上區間車還有幾分鐘
 */

import { useState, useEffect } from 'react';
import { Clock, ArrowDown, ArrowUp } from 'lucide-react';

interface TrainInfo {
  direction: 'south' | 'north';
  time: string;
  minutesUntil: number;
  destination: string;
}

// 大林火車站時刻表（區間車）
const TRAIN_SCHEDULE = [
  // 南下（往嘉義）
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
  // 北上（往斗六）
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
  { direction: 'north', time: '20:30', destination: '斗六' },
];

function getNextTrains(): TrainInfo[] {
  const now = new Date();
  // 確保使用正確的時間（台灣時區 UTC+8）
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const taiwanHours = (utcHours + 8) % 24;
  const taiwanMinutes = utcMinutes;
  const currentTotalMinutes = taiwanHours * 60 + taiwanMinutes;

  const nextTrains: TrainInfo[] = [];

  // 找下一班南下車
  const southTrains = TRAIN_SCHEDULE.filter(t => t.direction === 'south');
  let foundSouth = false;
  
  for (const train of southTrains) {
    const [h, m] = train.time.split(':').map(Number);
    const trainTotalMinutes = h * 60 + m;
    if (trainTotalMinutes > currentTotalMinutes) {
      const minutesUntil = trainTotalMinutes - currentTotalMinutes;
      nextTrains.push({
        direction: 'south',
        time: train.time,
        minutesUntil,
        destination: train.destination,
      });
      foundSouth = true;
      break;
    }
  }

  // 如果沒有找到今天的南下班次，返回明天的第一班
  if (!foundSouth) {
    const firstSouth = southTrains[0];
    const [h, m] = firstSouth.time.split(':').map(Number);
    const trainTotalMinutes = h * 60 + m;
    const minutesUntil = (24 * 60 - currentTotalMinutes) + trainTotalMinutes;
    nextTrains.push({
      direction: 'south',
      time: firstSouth.time,
      minutesUntil,
      destination: firstSouth.destination,
    });
  }

  // 找下一班北上車
  const northTrains = TRAIN_SCHEDULE.filter(t => t.direction === 'north');
  let foundNorth = false;
  
  for (const train of northTrains) {
    const [h, m] = train.time.split(':').map(Number);
    const trainTotalMinutes = h * 60 + m;
    if (trainTotalMinutes > currentTotalMinutes) {
      const minutesUntil = trainTotalMinutes - currentTotalMinutes;
      nextTrains.push({
        direction: 'north',
        time: train.time,
        minutesUntil,
        destination: train.destination,
      });
      foundNorth = true;
      break;
    }
  }

  // 如果沒有找到今天的北上班次，返回明天的第一班
  if (!foundNorth) {
    const firstNorth = northTrains[0];
    const [h, m] = firstNorth.time.split(':').map(Number);
    const trainTotalMinutes = h * 60 + m;
    const minutesUntil = (24 * 60 - currentTotalMinutes) + trainTotalMinutes;
    nextTrains.push({
      direction: 'north',
      time: firstNorth.time,
      minutesUntil,
      destination: firstNorth.destination,
    });
  }

  return nextTrains;
}

export default function TrainInfoBoard() {
  const [trains, setTrains] = useState<TrainInfo[]>(getNextTrains());

  useEffect(() => {
    // 初始化
    setTrains(getNextTrains());

    // 每分鐘更新一次
    const interval = setInterval(() => {
      setTrains(getNextTrains());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          現在幾點？
        </h2>
        <p className="text-muted-foreground text-lg">
          距離下一班火車還有多久
        </p>
      </div>

      {/* 列車資訊卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trains.map(train => (
          <div
            key={train.direction}
            className="bg-white rounded-lg border-2 border-secondary/30 p-6 hover:shadow-lg transition-shadow"
          >
            {/* 方向 */}
            <div className="flex items-center gap-3 mb-4">
              {train.direction === 'south' ? (
                <ArrowDown className="w-6 h-6 text-primary" />
              ) : (
                <ArrowUp className="w-6 h-6 text-accent" />
              )}
              <span className="font-display text-xl font-bold text-foreground">
                {train.direction === 'south' ? '南下' : '北上'}
              </span>
            </div>

            {/* 目的地 */}
            <p className="text-muted-foreground mb-4 text-sm">
              往 {train.destination}
            </p>

            {/* 時間和倒數 */}
            <div className="flex items-baseline gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-2xl font-bold text-foreground">
                  {train.time}
                </span>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm text-muted-foreground">還有</p>
                <p className="text-3xl font-bold text-primary">
                  {train.minutesUntil} 分
                </p>
              </div>
            </div>

            {/* 進度條 */}
            <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-1000"
                style={{
                  width: `${Math.max(0, ((60 - train.minutesUntil) / 60) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 提示 */}
      <div className="mt-8 p-4 bg-primary/10 border-l-4 border-primary rounded">
        <p className="text-foreground text-sm">
          💡 <span className="font-semibold">小提示：</span>
          區間車是最便宜的選擇，約 $30-50，從嘉義到大林只要 10 分鐘！
        </p>
      </div>
    </div>
  );
}
