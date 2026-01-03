/**
 * 大林慢遊資料常數
 * 包含美食、景點、行程等所有資料
 */

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'under50' | 'under100' | 'hearty' | 'photogenic';
  description: string;
  rating: number;
  address: string;
  mapUrl: string;
  image?: string;
}

export interface ItineraryStop {
  id: string;
  time: string;
  name: string;
  description: string;
  icon: string;
  mapUrl: string;
  tips: string;
}

export interface VibeSpot {
  id: string;
  vibe: 'vintage' | 'retro' | 'industrial' | 'nature';
  name: string;
  description: string;
  image?: string;
  mapUrl: string;
}

export interface FoodOption {
  id: string;
  name: string;
  price: number;
  emoji: string;
  mapUrl: string;
}

// 銅板美食地圖
export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'stinky-tofu',
    name: '臭豆腐',
    price: 50,
    category: 'under50',
    description: '大林在地經典，香到不行的臭豆腐',
    rating: 4.5,
    address: '大林鎮中山路',
    mapUrl: 'https://maps.google.com/?q=大林臭豆腐',
  },
  {
    id: 'dog-tail-chicken',
    name: '狗尾雞',
    price: 80,
    category: 'under100',
    description: '獨特的在地小吃，脆皮又多汁',
    rating: 4.3,
    address: '大林鎮民雄路',
    mapUrl: 'https://maps.google.com/?q=大林狗尾雞',
  },
  {
    id: 'pork-rib-rice',
    name: '排骨飯',
    price: 70,
    category: 'under100',
    description: '便宜又大碗，學生最愛',
    rating: 4.4,
    address: '大林鎮中正路',
    mapUrl: 'https://maps.google.com/?q=大林排骨飯',
  },
  {
    id: 'meat-soup',
    name: '肉羹湯',
    price: 60,
    category: 'under100',
    description: '濃郁的湯頭，冬天必點',
    rating: 4.2,
    address: '大林鎮民雄路',
    mapUrl: 'https://maps.google.com/?q=大林肉羹湯',
  },
  {
    id: 'shaved-ice',
    name: '糖廠冰棒',
    price: 20,
    category: 'under50',
    description: '大林糖廠限定，便宜又涼快',
    rating: 4.6,
    address: '大林糖廠',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'fried-tofu',
    name: '炸豆腐',
    price: 45,
    category: 'under50',
    description: '外脆內軟，銅板價格',
    rating: 4.3,
    address: '大林鎮中山路',
    mapUrl: 'https://maps.google.com/?q=大林炸豆腐',
  },
  {
    id: 'oyster-omelette',
    name: '蚵仔煎',
    price: 80,
    category: 'photogenic',
    description: '金黃色澤，IG 必拍',
    rating: 4.5,
    address: '大林鎮中正路',
    mapUrl: 'https://maps.google.com/?q=大林蚵仔煎',
  },
  {
    id: 'noodles',
    name: '陽春麵',
    price: 35,
    category: 'hearty',
    description: '簡單樸實的好滋味',
    rating: 4.1,
    address: '大林鎮民雄路',
    mapUrl: 'https://maps.google.com/?q=大林陽春麵',
  },
];

// 一日遊行程規劃
export const ITINERARY: ItineraryStop[] = [
  {
    id: 'station',
    time: '10:00 AM',
    name: '大林火車站',
    description: '抵達大林，拍照打卡，介紹站長宿舍（日式建築，免門票）',
    icon: '🚂',
    mapUrl: 'https://maps.google.com/?q=大林火車站',
    tips: '火車站前有免費停車場，適合拍照打卡',
  },
  {
    id: 'theater',
    time: '11:00 AM',
    name: '萬國戲院',
    description: '尋找懷舊電影海報（IG 必拍，免門票）',
    icon: '🎬',
    mapUrl: 'https://maps.google.com/?q=大林萬國戲院',
    tips: '保留完整的日式建築，是拍照聖地',
  },
  {
    id: 'oldstreet',
    time: '12:30 PM',
    name: '大林老街',
    description: '大林美食勝地，品嚐在地銅板美食',
    icon: '🍜',
    mapUrl: 'https://maps.google.com/?q=大林老街',
    tips: '中午是用餐尖峰時段，建議提早到',
  },
  {
    id: 'sugarfactory',
    time: '14:30 PM',
    name: '大林糖廠',
    description: '下午茶：吃冰棒（20元搞定），散步鐵道',
    icon: '🍨',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
    tips: '糖廠內有許多懷舊建築，適合拍照',
  },
  {
    id: 'return',
    time: '16:30 PM',
    name: '賦歸或前往嘉義市',
    description: '搭火車返回或前往嘉義市繼續遊玩',
    icon: '🚆',
    mapUrl: 'https://maps.google.com/?q=大林火車站',
    tips: '下午班次較少，建議提早查詢時刻表',
  },
];

// IG 濾鏡景點配對
export const VIBE_SPOTS: VibeSpot[] = [
  {
    id: 'vintage-station',
    vibe: 'vintage',
    name: '大林火車站站長宿舍',
    description: '日式建築，完美詮釋懷舊感',
    mapUrl: 'https://maps.google.com/?q=大林火車站站長宿舍',
  },
  {
    id: 'retro-theater',
    vibe: 'retro',
    name: '萬國戲院',
    description: '電影海報、老招牌，復古滿分',
    mapUrl: 'https://maps.google.com/?q=大林萬國戲院',
  },
  {
    id: 'industrial-factory',
    vibe: 'industrial',
    name: '大林糖廠舊倉庫',
    description: '工業遺跡，廢墟風格愛好者必訪',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'nature-park',
    vibe: 'nature',
    name: '大林自然公園',
    description: '綠意盎然，療癒系景點',
    mapUrl: 'https://maps.google.com/?q=大林自然公園',
  },
];

// 吃什麼轉盤選項
export const FOOD_WHEEL_OPTIONS: FoodOption[] = [
  {
    id: 'stinky-tofu-wheel',
    name: '臭豆腐',
    price: 50,
    emoji: '🍲',
    mapUrl: 'https://maps.google.com/?q=大林臭豆腐',
  },
  {
    id: 'dog-tail-chicken-wheel',
    name: '狗尾雞',
    price: 80,
    emoji: '🍗',
    mapUrl: 'https://maps.google.com/?q=大林狗尾雞',
  },
  {
    id: 'meat-soup-wheel',
    name: '肉羹湯',
    price: 60,
    emoji: '🍲',
    mapUrl: 'https://maps.google.com/?q=大林肉羹湯',
  },
  {
    id: 'pork-rib-rice-wheel',
    name: '排骨飯',
    price: 70,
    emoji: '🍚',
    mapUrl: 'https://maps.google.com/?q=大林排骨飯',
  },
  {
    id: 'shaved-ice-wheel',
    name: '糖廠冰棒',
    price: 20,
    emoji: '🍦',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'fried-tofu-wheel',
    name: '炸豆腐',
    price: 45,
    emoji: '🍲',
    mapUrl: 'https://maps.google.com/?q=大林炸豆腐',
  },
  {
    id: 'oyster-omelette-wheel',
    name: '蚵仔煎',
    price: 80,
    emoji: '🥘',
    mapUrl: 'https://maps.google.com/?q=大林蚵仔煎',
  },
  {
    id: 'noodles-wheel',
    name: '陽春麵',
    price: 35,
    emoji: '🍜',
    mapUrl: 'https://maps.google.com/?q=大林陽春麵',
  },
];

// 預算試算機提示訊息
export const BUDGET_MESSAGES = {
  generous: {
    emoji: '💰',
    text: '闊綽！你可以多點一份炸豆腐。',
  },
  comfortable: {
    emoji: '😊',
    text: '預算充足，可以好好享受大林美食。',
  },
  tight: {
    emoji: '😅',
    text: '緊張！建議點銅板美食，省一點。',
  },
  warning: {
    emoji: '⚠️',
    text: '警告！你可能需要走路回車站，或者去廟口喝水。',
  },
};
