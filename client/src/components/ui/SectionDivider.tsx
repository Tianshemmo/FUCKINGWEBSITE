/**
 * 分隔符組件 - 用於分隔各個功能區塊
 * 支援波浪、火車軌道、齒輪等不同風格
 */

interface SectionDividerProps {
  type?: 'wave' | 'train-track' | 'gear';
}

export default function SectionDivider({ type = 'wave' }: SectionDividerProps) {
  if (type === 'wave') {
    return (
      <svg
        className="w-full h-20 md:h-24 text-secondary/20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === 'train-track') {
    return (
      <div className="w-full py-8 flex items-center justify-center gap-4 px-4">
        <div className="flex-1 h-1 bg-secondary/30" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 border-2 border-secondary/40 rounded-sm"
            />
          ))}
        </div>
        <div className="flex-1 h-1 bg-secondary/30" />
      </div>
    );
  }

  if (type === 'gear') {
    return (
      <svg
        className="w-full h-16 md:h-20 text-primary/20"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        {/* 左側齒輪 */}
        <circle cx="100" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 25;
          const y1 = 40 + Math.sin(angle) * 25;
          const x2 = 100 + Math.cos(angle) * 32;
          const y2 = 40 + Math.sin(angle) * 32;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
            />
          );
        })}

        {/* 中間線 */}
        <line x1="150" y1="40" x2="1050" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="10,5" />

        {/* 右側齒輪 */}
        <circle cx="1100" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="1100" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
          const x1 = 1100 + Math.cos(angle) * 25;
          const y1 = 40 + Math.sin(angle) * 25;
          const x2 = 1100 + Math.cos(angle) * 32;
          const y2 = 40 + Math.sin(angle) * 32;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  }

  return null;
}
