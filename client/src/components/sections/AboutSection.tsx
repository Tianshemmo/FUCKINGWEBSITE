import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const images = [
  { src: '/images/s1.jpg', alt: '大林風景 1' },
  { src: '/images/s2.jpg', alt: '大林風景 2' },
  { src: '/images/s3.jpg', alt: '大林風景 3' },
  { src: '/images/s4.jpg', alt: '大林風景 4' },
  { src: '/images/s5.jpg', alt: '大林風景 5' },
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="w-full py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* 左側：文字敘述 */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-sm tracking-widest uppercase">
              Discover Dalin
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-foreground leading-tight">
              關於大林：<br />
              <span className="text-primary">西部首座國際慢城</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
              <p>
                大林鎮位於嘉義縣北部，曾是台灣重要的糖業中心。這裡不僅擁有深厚的歷史底蘊，更是全台灣西部第一個獲得「國際慢城」認證的城鎮。
              </p>
              <p>
                走在大林街頭，你可以感受到一種與世無爭的寧靜。從充滿故事的大林火車站，到散發甜香的糖廠，每一處角落都訴說著這座小鎮的過去與未來。
              </p>
              <p>
                這裡不僅有豐富的銅板美食，更有如佐登妮絲城堡、蓋婭莊園等現代景點，完美融合了復古與現代的魅力。
              </p>
            </div>
            
            {/* 特色標籤 */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['國際慢城', '糖業故鄉', '蘭花之鎮', '銅板美食'].map((tag) => (
                <div key={tag} className="px-6 py-3 bg-secondary/50 rounded-2xl font-bold text-secondary-foreground">
                  # {tag}
                </div>
              ))}
            </div>
          </div>

          {/* 右側：圖片輪播 */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-in-out transform",
                    index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                  )}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* 漸層遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>
              ))}

              {/* 輪播按鈕 */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              {/* 指示點 */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </div>
            
            {/* 裝飾性背景 */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-primary/10 rounded-[2rem]" />
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-accent/10 rounded-[2rem]" />
          </div>

        </div>
      </div>
    </section>
  );
}
