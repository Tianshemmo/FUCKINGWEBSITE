import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className={cn(
        "fixed bottom-10 right-10 z-[9999] transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-50 pointer-events-none"
      )}
      style={{ bottom: '40px', right: '40px' }} // 使用 inline style 確保定位
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full w-16 h-16 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-white transition-transform hover:-translate-y-2 active:scale-90 flex items-center justify-center"
      >
        <ArrowUp size={32} strokeWidth={4} />
      </Button>
    </div>
  );
}
