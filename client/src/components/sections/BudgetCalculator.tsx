/**
 * 生存預算試算機組件
 * 計算使用者在大林的預算分配，提供即時反饋和圓餅圖結果
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { BUDGET_MESSAGES } from '@/lib/daling-data';

interface BudgetBreakdown {
  transport: number;
  food: number;
  souvenir: number;
  remaining: number;
}

export default function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(500);
  const [transport, setTransport] = useState('train');
  const [buySouvenir, setBuySouvenir] = useState(false);
  const [breakdown, setBreakdown] = useState<BudgetBreakdown>({
    transport: 50,
    food: 300,
    souvenir: 0,
    remaining: 150,
  });

  useEffect(() => {
    const transportCost = transport === 'train' ? 50 : 100;
    const souvenirCost = buySouvenir ? 100 : 0;
    const foodBudget = totalBudget - transportCost - souvenirCost;
    const remaining = Math.max(0, foodBudget);

    setBreakdown({
      transport: transportCost,
      food: Math.max(0, foodBudget),
      souvenir: souvenirCost,
      remaining: remaining,
    });
  }, [totalBudget, transport, buySouvenir]);

  const getMessageType = () => {
    if (breakdown.remaining > 200) return 'generous';
    if (breakdown.remaining > 100) return 'comfortable';
    if (breakdown.remaining > 0) return 'tight';
    return 'warning';
  };

  const message = BUDGET_MESSAGES[getMessageType() as keyof typeof BUDGET_MESSAGES];

  const pieChartData = [
    { label: '交通', value: breakdown.transport, color: '#5A5A5A' },
    { label: '美食', value: breakdown.food, color: '#F4D03F' },
    { label: '伴手禮', value: breakdown.souvenir, color: '#4A9B6F' },
    { label: '剩餘', value: breakdown.remaining, color: '#E8E3D6' },
  ].filter(item => item.value > 0);

  const total = breakdown.transport + breakdown.food + breakdown.souvenir + breakdown.remaining;

  const renderPieChart = () => {
    let angle = 0;
    const paths: React.ReactNode[] = [];

    pieChartData.forEach((item, index) => {
      const percentage = (item.value / total) * 100;
      const startAngle = angle;
      const endAngle = angle + (percentage / 100) * 360;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 100 + 80 * Math.cos(startRad);
      const y1 = 100 + 80 * Math.sin(startRad);
      const x2 = 100 + 80 * Math.cos(endRad);
      const y2 = 100 + 80 * Math.sin(endRad);

      const largeArc = percentage > 50 ? 1 : 0;
      const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

      paths.push(
        <path key={index} d={path} fill={item.color} stroke="white" strokeWidth="2" />
      );

      angle = endAngle;
    });

    return paths;
  };

  return (
    <div className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          生存預算試算機
        </h2>
        <p className="text-muted-foreground text-lg">
          計算你能怎麼生存
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：輸入表單 */}
        <div className="space-y-6">
          {/* 預算滑桿 */}
          <Card className="p-6">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              你的總預算
            </label>
            <div className="flex items-center gap-4">
              <Slider
                value={[totalBudget]}
                onValueChange={(value) => setTotalBudget(value[0])}
                min={100}
                max={2000}
                step={50}
                className="flex-1"
              />
              <span className="font-display text-3xl font-bold text-primary min-w-fit">
                ${totalBudget}
              </span>
            </div>
          </Card>

          {/* 交通方式 */}
          <Card className="p-6">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              預計交通方式
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="transport"
                  value="train"
                  checked={transport === 'train'}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-foreground">
                  🚂 火車 ($50 - 最便宜)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="transport"
                  value="scooter"
                  checked={transport === 'scooter'}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-foreground">
                  🏍️ 機車 ($100 - 油錢+停車)
                </span>
              </label>
            </div>
          </Card>

          {/* 伴手禮 */}
          <Card className="p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={buySouvenir}
                onChange={(e) => setBuySouvenir(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="font-display text-lg font-bold text-foreground">
                是否要買伴手禮？ ($100)
              </span>
            </label>
          </Card>
        </div>

        {/* 右側：結果 */}
        <div className="space-y-6">
          {/* 圓餅圖 */}
          <Card className="p-6 flex flex-col items-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="mb-4">
              {renderPieChart()}
              <circle cx="100" cy="100" r="30" fill="white" stroke="#2C2C2C" strokeWidth="2" />
              <circle cx="100" cy="100" r="15" fill="#F4D03F" />
            </svg>

            {/* 圖例 */}
            <div className="w-full space-y-2">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <span className="font-bold text-foreground">${item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 反饋訊息 */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
            <div className="text-center">
              <p className="text-4xl mb-3">{message.emoji}</p>
              <p className="font-display text-xl font-bold text-foreground mb-2">
                {message.text}
              </p>
              <p className="text-sm text-muted-foreground">
                剩餘預算：<span className="font-bold text-primary">${breakdown.remaining}</span>
              </p>
            </div>
          </Card>

          {/* 分享按鈕 */}
          <Button
            onClick={() => {
              const text = `我的大林生存預算：總預算 $${totalBudget}，剩餘 $${breakdown.remaining}。${message.text}`;
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
              window.open(url, '_blank');
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            📸 分享到 Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}
