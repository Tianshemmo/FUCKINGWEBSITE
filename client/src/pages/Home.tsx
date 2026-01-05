/**
 * 首頁 - 大林慢遊：銅板系生存指南
 * 
 * 設計哲學：
 * - 長滾動式設計，每個功能區塊獨立成段
 * - 使用火車軌道圖案分隔各區塊
 * - 復古懷舊 × 青年文化混搭
 * - 色彩：大林糖廠黃 + 鐵道灰 + 青綠 + 米白背景
 */

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WeatherSection from '@/components/sections/WeatherSection';
import FoodMapSection from '@/components/sections/FoodMapSection';
import ItinerarySection from '@/components/sections/ItinerarySection';
import CustomPlanner from '@/components/sections/CustomPlanner'; // 新增自定義規劃器
import BudgetCalculator from '@/components/sections/BudgetCalculator';
import FoodWheel from '@/components/sections/FoodWheel';

import FooterSection from '@/components/sections/FooterSection';
import SectionDivider from '@/components/ui/SectionDivider';
import Navbar from '@/components/ui/Navbar';
import BackToTop from '@/components/ui/BackToTop';

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
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <BackToTop />
      {/* 進度條 */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

        {/* 主要內容 */}
      <main className="w-full">
        {/* 英雄區 */}
        <HeroSection />

        {/* 關於大林 */}
        <AboutSection />

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* 天氣資訊 */}
        <section id="weather" className="py-16 px-4 md:px-8">
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

        {/* 一日遊行程規劃 (懶人包) */}
        <section className="py-16 px-4 md:px-8">
          <div className="container">
            <ItinerarySection />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* 自定義行程規劃器 (新功能) */}
        <section id="planner" className="py-16 px-4 md:px-8 bg-muted/30">
          <div className="container">
            <CustomPlanner />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="train-track" />

        {/* 生存預算試算機 */}
        <section id="budget" className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container">
            <BudgetCalculator />
          </div>
        </section>

        {/* 分隔符 */}
        <SectionDivider type="wave" />

        {/* 吃什麼轉盤 */}
        <section id="wheel" className="py-16 px-4 md:px-8">
          <div className="container">
            <FoodWheel />
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