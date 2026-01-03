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
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-daling-station.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* 核心內容區塊 */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          大林慢遊
        </h1>

        <p className="font-display text-2xl md:text-3xl text-primary font-bold mb-6 drop-shadow-md">
          銅板系生存指南
        </p>

        <p className="text-lg md:text-xl text-white mb-10 drop-shadow-md leading-relaxed">
          離嘉義市區只要 <span className="text-primary font-bold">10 分鐘火車</span>
          <br />
          CP 值最高的約會聖地
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            onClick={() => document.getElementById('food-map')?.scrollIntoView({ behavior: 'smooth' })}
          >
            探索美食
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/20 font-bold"
            onClick={() => document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' })}
          >
            查看行程
          </Button>
        </div>
      </div>

      {/* 修正後的向下滾動提示：移出內容區塊，放在 section 的直接子層 */}
      <div className="absolute bottom-100 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 text-white/90 hover:text-primary transition-all animate-bounce"
        >
          <span className="text-xl tracking-widest font-light">往下滑動</span>
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
}
