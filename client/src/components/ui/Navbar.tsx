import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: '關於大林', href: '#about' },
  { name: '天氣資訊', href: '#weather' },
  { name: '美食地圖', href: '#food-map' },
  { name: '一日遊', href: '#itinerary' },
  { name: '行程規劃', href: '#planner' },
  { name: '預算試算', href: '#budget' },
  { name: '吃什麼', href: '#wheel' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 100; // 考慮到 Navbar 的高度
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 px-4 md:px-12 w-full",
      "bg-white shadow-2xl border-b-2 border-primary/20 py-4 md:py-5"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-display text-2xl md:text-4xl font-black text-primary tracking-tighter shrink-0">
          大林慢遊
        </div>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-lg xl:text-xl font-black text-foreground hover:text-primary transition-all hover:scale-110 active:scale-95 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* 手機版快速導航 */}
        <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar py-1 ml-4">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm font-black whitespace-nowrap px-4 py-2 bg-primary text-white rounded-full shadow-md"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
