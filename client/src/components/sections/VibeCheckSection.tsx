/**
 * IG 濾鏡景點配對組件
 * 根據使用者的風格偏好推薦最適合拍照的景點
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VIBE_SPOTS, getMapUrl } from '@/lib/daling-data';
import { MapPin } from 'lucide-react';

type VibeType = 'vintage' | 'retro' | 'industrial' | 'nature';

const VIBE_OPTIONS: { value: VibeType; label: string; emoji: string; description: string }[] = [
  { value: 'vintage', label: '日系', emoji: '🎌', description: '懷舊日式風情' },
  { value: 'retro', label: '復古', emoji: '📽️', description: '老招牌、電影感' },
  { value: 'industrial', label: '廢墟風', emoji: '🏭', description: '工業遺跡、粗獷感' },
  { value: 'nature', label: '療癒系', emoji: '🌿', description: '綠意盎然、自然感' },
];

export default function VibeCheckSection() {
  const [selectedVibe, setSelectedVibe] = useState<VibeType | null>(null);
  const [recommendedSpot, setRecommendedSpot] = useState<typeof VIBE_SPOTS[0] | null>(null);

  const handleVibeSelect = (vibe: VibeType) => {
    setSelectedVibe(vibe);
    const spot = VIBE_SPOTS.find(s => s.vibe === vibe);
    setRecommendedSpot(spot || null);
  };

  return (
    <div className="w-full">
      {/* 標題 */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          IG 濾鏡景點配對
        </h2>
        <p className="text-muted-foreground text-lg">
          Vibe Check - 找到最適合你的拍照聖地
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：風格選擇 */}
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            你今天的穿搭或心情是？
          </h3>

          <div className="space-y-3">
            {VIBE_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => handleVibeSelect(option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedVibe === option.value
                    ? 'bg-primary border-primary'
                    : 'bg-white border-secondary/20 hover:border-secondary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{option.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-display text-lg font-bold ${
                      selectedVibe === option.value ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {option.label}
                    </p>
                    <p className={`text-sm ${
                      selectedVibe === option.value ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 說明 */}
          <div className="mt-8 p-4 bg-accent/10 border-l-4 border-accent rounded">
            <p className="text-foreground text-sm">
              💡 <span className="font-semibold">小提示：</span>
              大林有各種風格的景點，選擇你喜歡的風格，讓我們推薦最適合你的拍照地點！
            </p>
          </div>
        </div>

        {/* 右側：推薦結果 */}
        <div>
          {recommendedSpot ? (
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent h-full flex flex-col justify-between">
              <div>
                <p className="text-6xl mb-4 text-center">
                  {VIBE_OPTIONS.find(v => v.value === selectedVibe)?.emoji}
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3 text-center">
                  {recommendedSpot.name}
                </h3>
                <p className="text-foreground mb-6 text-center leading-relaxed">
                  {recommendedSpot.description}
                </p>
              </div>

              {/* 導航按鈕 */}
              <Button
                onClick={() => window.open(getMapUrl(recommendedSpot.placeId, recommendedSpot.name), '_blank')}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mb-3"
              >
                <MapPin size={18} className="mr-2" />
                Google Maps 導航
              </Button>

              {/* 其他景點 */}
              <div className="mt-6 pt-6 border-t-2 border-accent/30">
                <p className="text-sm font-semibold text-foreground mb-3">
                  其他推薦景點
                </p>
                <div className="space-y-2">
                  {VIBE_SPOTS.filter(s => s.vibe !== selectedVibe).slice(0, 2).map(spot => (
                    <button
                      key={spot.id}
                      onClick={() => window.open(getMapUrl(spot.placeId, spot.name), '_blank')}
                      className="w-full p-2 text-left text-sm rounded border border-accent/30 hover:bg-accent/10 transition-colors text-foreground"
                    >
                      <p className="font-semibold">{spot.name}</p>
                      <p className="text-xs text-muted-foreground">{spot.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center border-2 border-secondary/20 h-full flex flex-col items-center justify-center">
              <p className="text-5xl mb-4">📸</p>
              <p className="text-xl text-muted-foreground font-semibold">
                選擇你的風格
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                我們會推薦最適合拍照的景點
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* 所有景點卡片 */}
      <div className="mt-12">
        <h3 className="font-display text-2xl font-bold text-foreground mb-6">
          大林所有景點
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIBE_SPOTS.map(spot => {
            const vibeOption = VIBE_OPTIONS.find(v => v.value === spot.vibe);
            return (
              <Card
                key={spot.id}
                className="p-4 border-2 border-secondary/20 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.open(getMapUrl(spot.placeId, spot.name), '_blank')}
              >
                <p className="text-3xl mb-2 text-center">{vibeOption?.emoji}</p>
                <h4 className="font-display text-sm font-bold text-foreground mb-1 text-center">
                  {spot.name}
                </h4>
                <p className="text-xs text-muted-foreground text-center">
                  {spot.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
