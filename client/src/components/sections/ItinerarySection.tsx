/**
 * 一日遊行程規劃組件
 * 垂直時間軸設計，展示大林一日遊行程，並支援單圖或多圖展示
 */

import { Button } from '@/components/ui/button';
import { MapPin, Clock, PlayCircle } from 'lucide-react';
import { ITINERARY, getMapUrl } from '@/lib/daling-data';

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
        <div className="space-y-12 md:space-y-24">
          {ITINERARY.map((stop, index) => (
            <div
              key={stop.id}
              className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* 文字內容區塊 */}
              <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-white rounded-2xl border-2 border-secondary/10 p-8 hover:shadow-2xl transition-all duration-500">
                  {/* 時間 */}
                  <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <Clock size={20} className="text-secondary" />
                    <span className="font-display text-xl font-bold text-foreground">
                      {stop.time}
                    </span>
                  </div>

                  {/* 地點名稱 */}
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                    {stop.name}
                  </h3>

                  {/* 描述 */}
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {stop.description}
                  </p>

                  {/* 小提示 */}
                  <div className={`flex mb-8 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <p className="text-sm bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl text-foreground inline-block text-left max-w-xs">
                      💡 {stop.tips}
                    </p>
                  </div>

                  {/* 導航按鈕 */}
                  <Button
                    onClick={() => window.open(getMapUrl(stop.placeId, stop.name), '_blank')}
                    className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-md px-8 py-6 text-lg"
                  >
                    <MapPin size={20} className="mr-2" />
                    Google Maps 導航
                  </Button>
                </div>
              </div>

              {/* 中央圓點 */}
              <div className="hidden md:flex items-center justify-center z-10">
                <div className="w-10 h-10 bg-primary rounded-full border-4 border-background shadow-2xl flex items-center justify-center text-sm text-white font-black">
                  {index + 1}
                </div>
              </div>

              {/* 圖片區塊 */}
              <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                {stop.images ? (
                  /* 多圖展示 (針對拾粹院) */
                  <div className="grid grid-cols-2 gap-3 h-full">
                    <div className="col-span-2 relative group overflow-hidden rounded-2xl shadow-lg aspect-video">
                      <img 
                        src={stop.images[0]} 
                        alt={`${stop.name}-1`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {(e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${stop.name}-1`}}
                      />
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square">
                      <img 
                        src={stop.images[1]} 
                        alt={`${stop.name}-2`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {(e.target as HTMLImageElement).src = `https://placehold.co/400x400?text=${stop.name}-2`}}
                      />
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square">
                      <img 
                        src={stop.images[2]} 
                        alt={`${stop.name}-3`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {(e.target as HTMLImageElement).src = `https://placehold.co/400x400?text=${stop.name}-3`}}
                      />
                    </div>
                  </div>
                ) : (
                  /* 單圖展示 */
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-video md:aspect-square lg:aspect-video">
                    <img 
                      src={stop.image} 
                      alt={stop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {(e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${stop.name}`}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-bold text-lg">{stop.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 總結區塊 - 修改為左右並排 */}
      <div className="mt-24 flex flex-col lg:flex-row gap-8 items-stretch">
        {/* 左側：預算估算 */}
        <div className="flex-1 p-10 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2 border-primary/20 rounded-3xl shadow-inner flex flex-col justify-center text-center lg:text-left">
          <h3 className="font-display text-3xl font-bold text-foreground mb-6 flex items-center justify-center lg:justify-start gap-3">
            💰 預算估計
          </h3>
          <div className="space-y-4">
            <p className="text-2xl text-foreground leading-relaxed">
              交通 (火車) + 美食 + 冰棒
              <br />
              <span className="text-5xl font-black text-primary">約 $150-200</span>
            </p>
            <p className="text-muted-foreground text-lg italic">
              ✨ 不用花大錢，也能享受大林的懷舊風情和在地美食！
            </p>
          </div>
        </div>

        {/* 右側：影片展示 */}
        <div className="flex-1 relative group overflow-hidden rounded-3xl shadow-2xl border-4 border-white aspect-video lg:aspect-auto">
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/666.mp4" type="video/mp4" />
            您的瀏覽器不支援影片播放。
          </video>
          {/* 影片裝飾遮罩 */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
          <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm font-bold flex items-center gap-2">
            <PlayCircle size={16} className="text-primary" />
            大林慢遊紀錄
          </div>
        </div>
      </div>
    </div>
  );
}
