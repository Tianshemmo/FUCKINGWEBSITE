/**
 * 銅板美食地圖組件
 * 展示大林在地美食，支援篩選和 Google Maps 導航
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import { FOOD_ITEMS } from '@/lib/daling-data';

type FilterType = 'all' | 'under50' | 'under100' | 'hearty' | 'photogenic';

export default function FoodMapSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredFoods = activeFilter === 'all'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter(food => food.category === activeFilter);

  const filterOptions: { value: FilterType; label: string; emoji: string }[] = [
    { value: 'all', label: '全部', emoji: '🍽️' },
    { value: 'under50', label: '50元以內', emoji: '💰' },
    { value: 'under100', label: '100元以內', emoji: '💵' },
    { value: 'hearty', label: '吃粗飽', emoji: '🍚' },
    { value: 'photogenic', label: '適合發限動', emoji: '📸' },
  ];

  return (
    <div id="food-map" className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          窮學生救星
        </h2>
        <p className="text-muted-foreground text-lg">
          美食地圖 - 銅板價格，大滿足
        </p>
      </div>

      {/* 篩選器 */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filterOptions.map(option => (
          <Button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            variant={activeFilter === option.value ? 'default' : 'outline'}
            className={activeFilter === option.value
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold'
              : 'border-2 border-secondary/30 text-foreground hover:bg-muted font-semibold'}
          >
            {option.emoji} {option.label}
          </Button>
        ))}
      </div>

      {/* 美食卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => (
          <div
            key={food.id}
            className="bg-white rounded-lg border-2 border-secondary/20 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
          >
            {/* 卡片頭部 */}
            <div className="p-4 border-b-2 border-secondary/10">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {food.name}
                </h3>
                <span className="text-2xl font-bold text-primary">
                  ${food.price}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {food.description}
              </p>
            </div>

            {/* 卡片內容 */}
            <div className="p-4 space-y-3">
              {/* 評分 */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(food.rating) ? 'fill-primary text-primary' : 'text-muted'}
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  {food.rating} / 5
                </span>
              </div>

              {/* 地址 */}
              <div className="flex items-start gap-2 text-sm text-foreground">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-secondary" />
                <span>{food.address}</span>
              </div>

              {/* 導航按鈕 */}
              <Button
                onClick={() => window.open(food.mapUrl, '_blank')}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                📍 Google Maps 導航
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 空狀態 */}
      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            沒有符合條件的美食
          </p>
        </div>
      )}
    </div>
  );
}
