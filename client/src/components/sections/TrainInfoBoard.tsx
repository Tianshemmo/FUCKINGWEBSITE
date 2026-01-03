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

export default function TrainInfoBoard() {
  const [trains, setTrains] = useState<TrainInfo[]>([
    { direction: 'south', time: '14:35', minutesUntil: 12, destination: '嘉義' },
    { direction: 'north', time: '14:42', minutesUntil: 19, destination: '斗六' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prev =>
        prev.map(train => ({
          ...train,
          minutesUntil: Math.max(0, train.minutesUntil - 1),
        }))
      );
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
