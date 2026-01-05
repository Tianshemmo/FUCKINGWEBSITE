/**
 * 首頁 - 大林慢遊：銅板系生存指南
 */

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import WeatherSection from '@/components/sections/WeatherSection'; // 確保這行存在
import FoodMapSection from '@/components/sections/FoodMapSection';
import ItinerarySection from '@/components/sections/ItinerarySection';
import BudgetCalculator from '@/components/sections/BudgetCalculator';
import FoodWheel from '@/components/sections/FoodWheel';
import VibeCheckSection from '@/components/sections/VibeCheckSection';
import FooterSection from '@/components/sections/FooterSection';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 進度條 */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 主要內容 */}
      <main className="w-full">
        {/* 英雄區 */}
        <HeroSection />

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* 即時天氣資訊 - 替換原本的火車資訊 */}
        <section className="py-16 px-4 md:px-8">
          <div className="container">
            <WeatherSection />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="train-track" />

        {/* 銅板美食地圖 */}
        <section className="py-16 px-4 md:px-8">
          <div className="container">
            <FoodMapSection />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="gear" />

        {/* 一日遊行程規劃 */}
        <section className="py-16 px-4 md:px-8">
          <div className="container">
            <ItinerarySection />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* 生存預算試算機 */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container">
            <BudgetCalculator />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="train-track" />

        {/* 吃什麼跑馬燈 (原本的轉盤) */}
        <section className="py-16 px-4 md:px-8">
          <div className="container">
            <FoodWheel />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* IG 濾鏡景點配對 */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container">
            <VibeCheckSection />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="gear" />

        {/* 頁尾 */}
        <FooterSection />
      </main>
    </div>
  );
}
