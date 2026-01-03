/**
 * 一日遊行程規劃組件
 * 垂直時間軸設計，展示大林一日遊行程
 */

import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { ITINERARY } from '@/lib/daling-data';

export default function ItinerarySection() {
  return (
    <div id="itinerary" className="w-full">
      {/* 標題 */}
      <div className="mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          完美一日遊
        </h2>
        <p className="text-muted-foreground text-lg">
          從早到晚的大林懶人包行程
        </p>
      </div>

      {/* 時間軸 */}
      <div className="relative">
        {/* 中央軌道線 */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

        {/* 時間軸項目 */}
        <div className="space-y-8 md:space-y-12">
          {ITINERARY.map((stop, index) => (
            <div
              key={stop.id}
              className={`flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* 左側內容 */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-white rounded-lg border-2 border-secondary/20 p-6 hover:shadow-lg transition-shadow">
                  {/* 時間 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={18} className="text-secondary" />
                    <span className="font-display text-lg font-bold text-foreground">
                      {stop.time}
                    </span>
                  </div>

                  {/* 地點名稱 */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {stop.name}
                  </h3>

                  {/* 描述 */}
                  <p className="text-muted-foreground mb-4">
                    {stop.description}
                  </p>

                  {/* 小提示 */}
                  <p className="text-sm bg-primary/10 border-l-2 border-primary p-3 rounded mb-4 text-foreground">
                    💡 {stop.tips}
                  </p>

                  {/* 導航按鈕 */}
                  <Button
                    onClick={() => window.open(stop.mapUrl, '_blank')}
                    className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  >
                    <MapPin size={16} className="mr-2" />
                    Google Maps 導航
                  </Button>
                </div>
              </div>

              {/* 中央圓點 */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg" />
              </div>

              {/* 右側空白 */}
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* 總結 */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-lg">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          💰 預算估算
        </h3>
        <p className="text-foreground mb-3">
          交通 (火車) + 美食 + 冰棒 = 約 $150-200
        </p>
        <p className="text-sm text-muted-foreground">
          ✨ 不用花大錢，也能享受大林的懷舊風情和在地美食！
        </p>
      </div>
    </div>
  );
}
