/**
 * 吃什麼轉盤組件
 * 互動旋轉轉盤，幫助使用者決定吃什麼
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FOOD_WHEEL_OPTIONS } from '@/lib/daling-data';

export default function FoodWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState<typeof FOOD_WHEEL_OPTIONS[0] | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = Math.floor(Math.random() * 5) + 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = spins * 360 + randomAngle;

    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      const normalizedRotation = (rotation + totalRotation) % 360;
      const segmentAngle = 360 / FOOD_WHEEL_OPTIONS.length;
      const selectedIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % FOOD_WHEEL_OPTIONS.length;
      setSelectedFood(FOOD_WHEEL_OPTIONS[selectedIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  const colors = [
    '#F4D03F', // 黃
    '#FF9F43', // 橙
    '#EE5A6F', // 紅
    '#4A9B6F', // 綠
    '#5A5A5A', // 灰
    '#FFD93D', // 亮黃
    '#FF6B6B', // 亮紅
    '#95E1D3', // 青綠
  ];

  return (
    <div className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          吃什麼轉盤
        </h2>
        <p className="text-muted-foreground text-lg">
          選擇困難症救星 - 讓轉盤決定你的晚餐
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：轉盤 */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 mb-8">
            {/* 轉盤 */}
            <svg
              width="256"
              height="256"
              viewBox="0 0 256 256"
              className="w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.98)' : 'none',
              }}
            >
              {FOOD_WHEEL_OPTIONS.map((food, index) => {
                const angle = (360 / FOOD_WHEEL_OPTIONS.length) * index;
                const nextAngle = angle + 360 / FOOD_WHEEL_OPTIONS.length;
                const startRad = (angle * Math.PI) / 180;
                const endRad = (nextAngle * Math.PI) / 180;

                const x1 = 128 + 100 * Math.cos(startRad);
                const y1 = 128 + 100 * Math.sin(startRad);
                const x2 = 128 + 100 * Math.cos(endRad);
                const y2 = 128 + 100 * Math.sin(endRad);

                const midAngle = (angle + nextAngle) / 2;
                const midRad = (midAngle * Math.PI) / 180;
                const textX = 128 + 65 * Math.cos(midRad);
                const textY = 128 + 65 * Math.sin(midRad);

                return (
                  <g key={index}>
                    <path
                      d={`M 128 128 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={colors[index % colors.length]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      transform={`rotate(${midAngle + 90} ${textX} ${textY})`}
                    >
                      {food.emoji} {food.name}
                    </text>
                  </g>
                );
              })}

              {/* 中心圓 */}
              <circle cx="128" cy="128" r="30" fill="white" stroke="#2C2C2C" strokeWidth="2" />
              <circle cx="128" cy="128" r="15" fill="#F4D03F" />
            </svg>

            {/* 指針 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
            </div>
          </div>

          {/* 旋轉按鈕 */}
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 font-display text-lg font-bold px-8 py-6"
          >
            {isSpinning ? '轉盤中...' : '抽！'}
          </Button>
        </div>

        {/* 右側：結果 */}
        <div className="flex flex-col justify-center">
          {selectedFood ? (
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
              <div className="text-center">
                <p className="text-6xl mb-4">{selectedFood.emoji}</p>
                <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                  {selectedFood.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-6">
                  ${selectedFood.price}
                </p>
                <p className="text-muted-foreground mb-6">
                  轉盤已決定！就吃這個吧 🎉
                </p>
                <Button
                  onClick={() => window.open(selectedFood.mapUrl, '_blank')}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mb-3"
                >
                  📍 Google Maps 導航
                </Button>
                <Button
                  onClick={handleSpin}
                  variant="outline"
                  className="w-full border-2 border-secondary/30 text-foreground hover:bg-muted font-semibold"
                >
                  再轉一次
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center border-2 border-secondary/20">
              <p className="text-4xl mb-4">🎡</p>
              <p className="text-xl text-muted-foreground font-semibold">
                點擊「抽！」按鈕開始轉盤
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                讓命運為你決定晚餐吃什麼
              </p>
            </Card>
          )}

          {/* 所有選項列表 */}
          <div className="mt-8">
            <h4 className="font-display text-lg font-bold text-foreground mb-4">
              轉盤選項
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {FOOD_WHEEL_OPTIONS.map(food => (
                <div
                  key={food.id}
                  className="p-3 bg-white rounded-lg border-2 border-secondary/20 text-center hover:shadow-md transition-shadow"
                >
                  <p className="text-2xl mb-1">{food.emoji}</p>
                  <p className="text-sm font-semibold text-foreground">{food.name}</p>
                  <p className="text-xs text-primary font-bold">${food.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
