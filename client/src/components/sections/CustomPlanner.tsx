/**
 * 自定義行程規劃器
 * 讓使用者挑選景點並產生 Google Maps 多點導航連結
 * 精準版：使用 Query 模式確保顯示景點名稱
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Navigation, Trash2 } from 'lucide-react';
import { ALL_ATTRACTIONS, Attraction } from '@/lib/daling-data';

export default function CustomPlanner() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAttraction = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const clearAll = () => setSelectedIds([]);

  const generateMapUrl = () => {
    if (selectedIds.length === 0) return;
    
    const selectedAttractions = selectedIds.map(id => 
      ALL_ATTRACTIONS.find(a => a.id === id)
    ).filter(Boolean) as Attraction[];

    // 使用 Google Maps Search Query 格式，這能最精準地顯示景點名稱
    const getQuery = (attr: Attraction) => encodeURIComponent(`${attr.name} ${attr.address}`);

    const origin = getQuery(selectedAttractions[0]);
    const destination = getQuery(selectedAttractions[selectedAttractions.length - 1]);
    
    // 構建多點導航 URL
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    
    if (selectedAttractions.length > 2) {
      const waypoints = selectedAttractions
        .slice(1, -1)
        .map(a => getQuery(a))
        .join('|');
      url += `&waypoints=${waypoints}`;
    }

    url += `&travelmode=driving`;

    window.open(url, '_blank');
  };

  return (
    <div id="planner" className="w-full py-12">
      <div className="mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          自定義行程規劃
        </h2>
        <p className="text-muted-foreground text-lg">
          挑選你想去的景點，一鍵產生 Google Maps 導航路線
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_ATTRACTIONS.map((attr) => (
              <Card 
                key={attr.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedIds.includes(attr.id) 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-transparent hover:border-slate-200'
                }`}
                onClick={() => toggleAttraction(attr.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={selectedIds.includes(attr.id)}
                    onCheckedChange={() => toggleAttraction(attr.id)}
                    className="mt-1"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{attr.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{attr.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 border-2 border-slate-100 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <MapPin className="text-primary" />
                我的行程 ({selectedIds.length})
              </h3>
              {selectedIds.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground hover:text-destructive">
                  <Trash2 size={16} className="mr-1" /> 清空
                </Button>
              )}
            </div>

            {selectedIds.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                <p className="text-muted-foreground">尚未選擇景點<br/>請從左側挑選(手機為上方)</p>
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {selectedIds.map((id, index) => {
                  const attr = ALL_ATTRACTIONS.find(a => a.id === id);
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                      <div className="w-6 h-6 bg-primary/20 text-primary text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="flex-grow font-medium text-slate-700">{attr?.name}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleAttraction(id); }} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-destructive transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <Button className="w-full py-6 text-lg font-bold shadow-lg" disabled={selectedIds.length < 2} onClick={generateMapUrl}>
              <Navigation className="mr-2" />
              {selectedIds.length < 2 ? '請至少選擇 2 個景點' : '開始 Google Maps 導航'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}