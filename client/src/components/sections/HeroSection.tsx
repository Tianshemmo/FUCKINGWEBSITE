/**
 * 英雄區組件
 * 設計：大林車站復古照片 + 手寫標題 + 一句話推坑
 */

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-daling-station.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 內容 */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 主標題 */}
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          大林慢遊
        </h1>

        {/* 副標題 */}
        <p className="font-display text-2xl md:text-3xl text-primary font-bold mb-6 drop-shadow-md">
          銅板系生存指南
        </p>

        {/* 推坑文案 */}
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md leading-relaxed">
          離嘉義市區只要 <span className="text-primary font-bold">10 分鐘火車</span>
          <br />
          CP 值最高的約會聖地
        </p>

        {/* CTA 按鈕 */}
        <div className="flex gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base"
            onClick={() => document.getElementById('food-map')?.scrollIntoView({ behavior: 'smooth' })}
          >
            探索美食
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/20 font-bold text-base"
            onClick={() => document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' })}
          >
            查看行程
          </Button>
        </div>

        {/* 向下滾動提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 text-white hover:text-primary transition-colors animate-bounce"
          >
            <span className="text-sm font-medium">向下滾動</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}