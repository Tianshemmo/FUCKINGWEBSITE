/**
 * 生存預算試算機組件
 * 計算使用者在大林的預算分配，提供即時反饋和圓餅圖結果
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BUDGET_MESSAGES } from '@/lib/daling-data';
import { Checkbox } from '@/components/ui/checkbox';

interface BudgetBreakdown {
  transport: number;
  food: number;
  tickets: number;
  souvenir: number;
  remaining: number;
}

export default function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(1000);
  const [transport, setTransport] = useState('train');
  const [customTransport, setCustomTransport] = useState('');
  
  // 景點門票
  const [visitJordenice, setVisitJordenice] = useState(false);
  const [jordeniceCount, setJordeniceCount] = useState(1);
  const [visitGaia, setVisitGaia] = useState(false);
  const [gaiaCount, setGaiaCount] = useState(1);
  
  // 伴手禮
  const [souvenirAmount, setSouvenirAmount] = useState(0);
  const [customSouvenir, setCustomSouvenir] = useState('');

  const [breakdown, setBreakdown] = useState<BudgetBreakdown>({
    transport: 50,
    food: 0,
    tickets: 0,
    souvenir: 0,
    remaining: 0,
  });

  useEffect(() => {
    let transportCost = 0;
    if (transport === 'train') transportCost = 50;
    else if (transport === 'scooter') transportCost = 100;
    else transportCost = parseInt(customTransport) || 0;

    const jordeniceCost = visitJordenice ? jordeniceCount * 200 : 0;
    const gaiaCost = visitGaia ? gaiaCount * 100 : 0;
    const ticketsTotal = jordeniceCost + gaiaCost;
    
    const souvenirCost = customSouvenir !== '' ? parseInt(customSouvenir) || 0 : souvenirAmount;
    
    const usedBudget = transportCost + ticketsTotal + souvenirCost;
    const foodBudget = Math.max(0, totalBudget - usedBudget);
    
    setBreakdown({
      transport: transportCost,
      food: foodBudget,
      tickets: ticketsTotal,
      souvenir: souvenirCost,
      remaining: foodBudget,
    });
  }, [totalBudget, transport, customTransport, visitJordenice, jordeniceCount, visitGaia, gaiaCount, souvenirAmount, customSouvenir]);

  const getMessageType = () => {
    if (breakdown.remaining > 500) return 'generous';
    if (breakdown.remaining > 200) return 'comfortable';
    if (breakdown.remaining > 50) return 'tight';
    return 'warning';
  };

  const message = BUDGET_MESSAGES[getMessageType() as keyof typeof BUDGET_MESSAGES];

  const pieChartData = [
    { label: '交通', value: breakdown.transport, color: '#5A5A5A' },
    { label: '美食', value: breakdown.food, color: '#F4D03F' },
    { label: '門票', value: breakdown.tickets, color: '#E74C3C' },
    { label: '伴手禮', value: breakdown.souvenir, color: '#4A9B6F' },
  ].filter(item => item.value > 0);

  const total = breakdown.transport + breakdown.food + breakdown.tickets + breakdown.souvenir;

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
          規劃你的大林之旅，看看錢包還剩多少
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：輸入表單 */}
        <div className="space-y-6">
          {/* 預算滑桿 */}
          <Card className="p-6 border-2 border-secondary/20">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              💰 你的總預算
            </label>
            <div className="flex items-center gap-6">
              <Slider
                value={[totalBudget]}
                onValueChange={(value) => setTotalBudget(value[0])}
                min={100}
                max={3000}
                step={50}
                className="flex-1"
              />
              <span className="font-display text-3xl font-black text-primary min-w-[100px] text-right">
                ${totalBudget}
              </span>
            </div>
          </Card>

          {/* 交通方式 */}
          <Card className="p-6 border-2 border-secondary/20">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              🚂 預計交通方式
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setTransport('train')}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all font-bold text-sm",
                  transport === 'train' ? "border-primary bg-primary/10 text-primary" : "border-secondary/10 hover:border-secondary/30"
                )}
              >
                火車 ($50)
              </button>
              <button
                onClick={() => setTransport('scooter')}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all font-bold text-sm",
                  transport === 'scooter' ? "border-primary bg-primary/10 text-primary" : "border-secondary/10 hover:border-secondary/30"
                )}
              >
                機車 ($100)
              </button>
              <button
                onClick={() => setTransport('custom')}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all font-bold text-sm",
                  transport === 'custom' ? "border-primary bg-primary/10 text-primary" : "border-secondary/10 hover:border-secondary/30"
                )}
              >
                自定義
              </button>
            </div>
            {transport === 'custom' && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-sm font-bold shrink-0">交通金額:</span>
                <Input
                  placeholder="輸入交通花費"
                  value={customTransport}
                  onChange={(e) => setCustomTransport(e.target.value)}
                  className="flex-1"
                />
              </div>
            )}
          </Card>

          {/* 景點門票 */}
          <Card className="p-6 border-2 border-secondary/20">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              🏰 景點門票
            </label>
            <div className="space-y-4">
              {/* 佐登妮絲 */}
              <div 
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer",
                  visitJordenice ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"
                )}
                onClick={() => setVisitJordenice(!visitJordenice)}
              >
                <div className="flex items-center gap-4">
                  <Checkbox 
                    id="jordenice" 
                    checked={visitJordenice} 
                    onCheckedChange={() => {}} // 點擊由父層 div 處理
                    className="pointer-events-none"
                  />
                  <span className="font-bold">佐登妮絲城堡 ($200)</span>
                </div>
                {visitJordenice && (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs font-bold">人數:</span>
                    <Input 
                      type="number" 
                      min="1" 
                      value={jordeniceCount} 
                      onChange={(e) => setJordeniceCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-8"
                    />
                  </div>
                )}
              </div>

              {/* 蓋婭莊園 */}
              <div 
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer",
                  visitGaia ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"
                )}
                onClick={() => setVisitGaia(!visitGaia)}
              >
                <div className="flex items-center gap-4">
                  <Checkbox 
                    id="gaia" 
                    checked={visitGaia} 
                    onCheckedChange={() => {}} // 點擊由父層 div 處理
                    className="pointer-events-none"
                  />
                  <span className="font-bold">蓋婭莊園 ($100)</span>
                </div>
                {visitGaia && (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs font-bold">人數:</span>
                    <Input 
                      type="number" 
                      min="1" 
                      value={gaiaCount} 
                      onChange={(e) => setGaiaCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-8"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 伴手禮 */}
          <Card className="p-6 border-2 border-secondary/20">
            <label className="font-display text-lg font-bold text-foreground mb-4 block">
              🎁 伴手禮預算
            </label>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[0, 50, 100, 200, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant={souvenirAmount === amount && customSouvenir === '' ? 'default' : 'outline'}
                    onClick={() => {
                      setSouvenirAmount(amount);
                      setCustomSouvenir('');
                    }}
                    className="flex-1"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold shrink-0">自定義:</span>
                <Input
                  placeholder="輸入金額"
                  value={customSouvenir}
                  onChange={(e) => {
                    setCustomSouvenir(e.target.value);
                    setSouvenirAmount(0);
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* 右側：結果 */}
        <div className="space-y-6">
          {/* 圓餅圖 */}
          <Card className="p-8 flex flex-col items-center border-2 border-secondary/20">
            <div className="relative mb-6">
              <svg width="240" height="240" viewBox="0 0 200 200">
                {renderPieChart()}
                <circle cx="100" cy="100" r="40" fill="white" />
                <text x="100" y="105" textAnchor="middle" className="font-black text-2xl fill-primary">
                  ${total}
                </text>
              </svg>
            </div>

            {/* 圖例 */}
            <div className="w-full grid grid-cols-2 gap-4">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <span className="font-black text-sm">${item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 反饋訊息 */}
          <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary shadow-xl">
            <div className="text-center">
              <p className="text-6xl mb-4">{message.emoji}</p>
              <h3 className="font-display text-2xl font-black text-foreground mb-3">
                {message.text}
              </h3>
              <div className="inline-block px-6 py-3 bg-white rounded-2xl shadow-inner">
                <p className="text-sm text-muted-foreground font-bold mb-1">可用於美食的預算</p>
                <p className="text-4xl font-black text-primary">${breakdown.remaining}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
