/**
 * 吃什麼跑馬燈組件
 * 輪流亮起格子，幫助使用者決定吃什麼
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FOOD_WHEEL_OPTIONS } from '@/lib/daling-data';
import { cn } from '@/lib/utils';

export default function FoodWheel() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState<typeof FOOD_WHEEL_OPTIONS[0] | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);
    
    let currentIndex = activeIndex || 0;
    let speed = 50; // 初始速度
    let rounds = 0;
    const totalRounds = 5 + Math.floor(Math.random() * 3); // 跑 5-8 圈
    const stopIndex = Math.floor(Math.random() * FOOD_WHEEL_OPTIONS.length);
    
    const run = () => {
      currentIndex = (currentIndex + 1) % FOOD_WHEEL_OPTIONS.length;
      setActiveIndex(currentIndex);

      // 計算進度
      const currentStep = rounds * FOOD_WHEEL_OPTIONS.length + currentIndex;
      const totalSteps = totalRounds * FOOD_WHEEL_OPTIONS.length + stopIndex;

      if (currentStep < totalSteps) {
        // 逐漸減速
        if (totalSteps - currentStep < 10) {
          speed += 30;
        } else if (totalSteps - currentStep < 20) {
          speed += 10;
        }
        
        if (currentIndex === FOOD_WHEEL_OPTIONS.length - 1) {
          rounds++;
        }
        
        setTimeout(run, speed);
      } else {
        // 停止
        setSelectedFood(FOOD_WHEEL_OPTIONS[stopIndex]);
        setIsSpinning(false);
      }
    };

    run();
  };

  return (
    <div className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          吃什麼決定器
        </h2>
        <p className="text-muted-foreground text-lg">
          選擇困難症救星 - 讓命運決定你的晚餐
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：跑馬燈格子 */}
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-3 w-full max-w-md aspect-square mb-8">
            {/* 1. 臭豆腐 */}
            <FoodGridItem index={0} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[0]} />
            {/* 2. 狗尾雞 */}
            <FoodGridItem index={1} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[1]} />
            {/* 3. 肉羹湯 */}
            <FoodGridItem index={2} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[2]} />
            
            {/* 8. 陽春麵 */}
            <FoodGridItem index={7} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[7]} />
            
            {/* 中間按鈕 */}
            <div className="flex items-center justify-center">
              <Button
                onClick={handleSpin}
                disabled={isSpinning}
                className={cn(
                  "w-full h-full rounded-xl font-display text-xl font-bold transition-all duration-200 shadow-lg",
                  isSpinning ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-primary/20"
                )}
              >
                {isSpinning ? '...' : '抽！'}
              </Button>
            </div>
            
            {/* 4. 排骨飯 */}
            <FoodGridItem index={3} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[3]} />
            
            {/* 7. 蚵仔煎 */}
            <FoodGridItem index={6} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[6]} />
            {/* 6. 炸豆腐 */}
            <FoodGridItem index={5} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[5]} />
            {/* 5. 糖廠冰棒 */}
            <FoodGridItem index={4} activeIndex={activeIndex} food={FOOD_WHEEL_OPTIONS[4]} />
          </div>
        </div>

        {/* 右側：結果 */}
        <div className="flex flex-col justify-center">
          {selectedFood ? (
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary animate-in zoom-in duration-300">
              <div className="text-center">
                <p className="text-6xl mb-4">{selectedFood.emoji}</p>
                <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                  {selectedFood.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-6">
                  ${selectedFood.price}
                </p>
                <p className="text-muted-foreground mb-6">
                  決定好了！就吃這個吧 🎉
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
                  再抽一次
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center border-2 border-secondary/20 h-full flex flex-col items-center justify-center">
              <p className="text-4xl mb-4">🎡</p>
              <p className="text-xl text-muted-foreground font-semibold">
                點擊「抽！」按鈕開始
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                讓命運為你決定晚餐吃什麼
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function FoodGridItem({ index, activeIndex, food }: { index: number, activeIndex: number | null, food: any }) {
  const isActive = activeIndex === index;
  
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-150 bg-white",
        isActive 
          ? "border-primary bg-primary/10 scale-105 shadow-lg z-10 ring-4 ring-primary/20" 
          : "border-secondary/20 opacity-80"
      )}
    >
      <span className="text-2xl mb-1">{food.emoji}</span>
      <span className="text-xs font-bold text-foreground text-center line-clamp-1">{food.name}</span>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
      )}
    </div>
  );
}