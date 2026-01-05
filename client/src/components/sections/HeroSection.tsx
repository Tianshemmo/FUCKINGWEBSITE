/**
 * 英雄區組件 - 重新設計版
 * 設計：沉浸式全螢幕背景 + 現代感排版 + 動態引導
 */

import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin, Train } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [offset, setOffset] = useState(0);

  // 視差滾動效果
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('weather');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900">
      {/* 背景圖片層 - 帶有視差效果 */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ 
          backgroundImage: 'url(/images/hero-daling-station.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset * 0.4}px) scale(${1 + offset * 0.0005})`,
          filter: 'brightness(0.6)'
        }}
      />

      {/* 漸層遮罩 - 讓文字更清晰，並與下方內容銜接 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-background" />

      {/* 核心內容區塊 */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* 小標籤 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md text-primary font-bold text-sm mb-8 animate-in fade-in slide-in-from-top duration-1000">
          <Train size={16} />
          <span>離嘉義市區只要 10 分鐘火車</span>
        </div>

        {/* 主標題 */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter animate-in fade-in zoom-in duration-1000">
          大林<span className="text-primary">慢遊</span>
        </h1>

        {/* 副標題 */}
        <p className="font-display text-2xl md:text-4xl text-white/90 font-bold mb-8 tracking-wide drop-shadow-lg animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          銅板系生存指南
        </p>

        {/* 描述文案 */}
        <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          不只是路過，在大林找回被遺忘的慢時光。
          <br className="hidden md:block" />
          用最少的預算，享受最純粹的在地風情。
        </p>

        {/* 行動按鈕 */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <Button
            size="lg"
            className="w-full sm:w-auto h-16 px-10 text-xl bg-primary text-primary-foreground hover:bg-primary/90 font-black rounded-2xl shadow-[0_10px_30px_rgba(var(--primary),0.4)] transition-all hover:-translate-y-1 active:scale-95"
            onClick={() => document.getElementById('food-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            📍 探索美食地圖
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-16 px-10 text-xl border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-black rounded-2xl transition-all hover:-translate-y-1 active:scale-95"
            onClick={() => document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            🗺️ 查看一日行程
          </Button>
        </div>
      </div>

      {/* 向下捲動提示 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-primary transition-colors"
        >
          <span className="text-sm tracking-[0.3em] font-bold uppercase">Scroll Down</span>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-primary/50 transition-colors">
            <div className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-primary transition-colors" />
          </div>
        </button>
      </div>

      {/* 裝飾性元素：背景漂浮的光點 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] animate-pulse delay-700" />
    </section>
  );
}
