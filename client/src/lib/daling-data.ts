/**
 * 大林慢遊資料常數
 * 包含美食、景點、行程等所有資料
 */

/**
 * 根據 Place ID 或搜尋關鍵字生成 Google Maps 連結
 * @param placeId Google Maps Place ID (優先使用)
 * @param query 搜尋關鍵字 (備用)
 * @returns Google Maps URL
 */
export const getMapUrl = (placeId?: string, query?: string): string => {
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || '')}&query_place_id=${placeId}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || '')}`;
};

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'under50' | 'under100' | 'under200' | 'luxury';
  description: string;
  rating: number;
  address: string;
  mapUrl: string;
  placeId?: string;
  image?: string;
}

export interface ItineraryStop {
  id: string;
  time: string;
  name: string;
  description: string;
  icon: string;
  mapUrl: string;
  placeId?: string;
  tips: string;
  image?: string;
  images?: string[];
}

export interface VibeSpot {
  id: string;
  vibe: 'vintage' | 'retro' | 'industrial' | 'nature';
  name: string;
  description: string;
  image?: string;
  mapUrl: string;
  placeId?: string;
}

export interface FoodOption {
  id: string;
  name: string;
  price: number;
  emoji: string;
  mapUrl: string;
  placeId?: string;
}

// 新增景點介面
export interface Attraction {
  id: string;
  name: string;
  description: string;
  address: string;
  image?: string;
  placeId?: string;
}

// 銅板美食地圖
export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'stinky-tofu',
    name: '臭豆腐',
    price: 65,
    category: 'under100',
    description: '大林在地經典，香到不行的臭豆腐',
    rating: 4.4,
    address: '大林鎮中山路',
    placeId: 'ChIJ4Wrfzrm-bjQRI9ofTIZQ3zk',
    mapUrl: 'https://maps.google.com/?q=大林臭豆腐',
  },
  {
    id: 'dog-tail-chicken',
    name: '狗尾雞',
    price: 580,
    category: 'luxury',
    description: '獨特的在地小吃',
    rating: 4.2,
    address: '大林鎮中山路',
    placeId: 'ChIJI-muZbm-bjQRk0UTmx4Ute4',
    mapUrl: 'https://maps.google.com/?q=大林狗尾雞',
  },
  {
    id: 'pork-rib-rice',
    name: '排骨飯',
    price: 110,
    category: 'under200',
    description: '買一個媽媽便當的親切感，小貴',
    rating: 3.9,
    address: '大林鎮中正路',
    placeId: 'ChIJjyswWbe-bjQRrLrF_xH4w54',
    mapUrl: 'https://maps.google.com/?q=大林排骨飯',
  },
  {
    id: 'meat-soup',
    name: '肉羹湯',
    price: 40,
    category: 'under50',
    description: '濃郁的湯頭，冬天必點',
    rating: 4.6,
    address: '大林鎮中山路',
    placeId: 'ChIJJX_-TaW-bjQR0iOk4OX8tno',
    mapUrl: 'https://maps.google.com/?q=大林肉羹湯',
  },
  {
    id: 'shaved-ice',
    name: '糖廠冰棒',
    price: 18,
    category: 'under50',
    description: '大林糖廠限定，便宜又涼快',
    rating: 4.1,
    address: '大林鎮大糖里',
    placeId: 'ChIJKY__v0q5bjQR-LIOfIzSRrY',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'grass-jelly',
    name: '燒仙草',
    price: 65,
    category: 'under100',
    description: '暖心甜品，在地推薦',
    rating: 4.5,
    address: '大林鎮中興一路',
    placeId: 'ChIJU-Renee_bjQRlsUkkXuvW3g',
    mapUrl: 'https://maps.google.com/?q=大林燒仙草',
  },
  {
    id: 'oyster-omelette',
    name: '蚵仔煎',
    price: 70,
    category: 'under100',
    description: '金黃色澤',
    rating: 3.6,
    address: '大林鎮中正路',
    placeId: 'ChIJRcqCXLe-bjQRB9Rq5F6y910',
    mapUrl: 'https://maps.google.com/?q=大林蚵仔煎',
  },
  {
    id: 'beef-noodles',
    name: '牛肉麵',
    price: 100,
    category: 'under200',
    description: '牛肉鬆軟，麵量、菜量多',
    rating: 4.1,
    address: '大林鎮忠孝路',
    placeId: 'ChIJsYC8hs6_bjQRZrRfAsba4zM',
    mapUrl: 'https://maps.google.com/?q=大林牛肉麵',
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
    placeId: 'ChIJscUcz7m-bjQRiZWYf1Z7ago',
    mapUrl: 'https://maps.app.goo.gl/D6CcwoYM5woDW7q6A',
    tips: '火車站前有免費停車場，適合拍照打卡',
    image: '/images/visit1.jpg'
  },
  {
    id: 'oldstreet',
    time: '11:30 AM',
    name: '大林老街',
    description: '大林美食勝地，品嚐在地銅板美食，感受在地老街氛圍',
    icon: '🍜',
    placeId: 'ChIJ9fuj2rm-bjQRIMmCG5d83gE',
    mapUrl: 'https://maps.app.goo.gl/HTfkQuzhfFSVjFaS6',
    tips: '中午是用餐尖峰時段，建議提早到',
    image: '/images/visit2.jpg'
  },
  {
    id: 'art-park',
    time: '13:30 PM',
    name: '拾粹院文創藝術園區 | 鯖魚主題館',
    description: '工作人員會非常親切的介紹、外面有很多可以拍照的地方',
    icon: '🎨',
    placeId: 'ChIJ7XD51T-5bjQRfzicxqy_tPE',
    mapUrl: 'https://maps.app.goo.gl/WWddhrNfjyPGFMnX6',
    tips: '園區內有大型 3D 彩繪牆，拍照效果極佳',
    images: ['/images/visit3-1.jpg', '/images/visit3-2.jpg', '/images/visit3-3.jpg']
  },
  {
    id: 'sugarfactory',
    time: '15:30 PM',
    name: '大林糖廠',
    description: '下午茶：吃冰棒（20元搞定），散步鐵道，享受悠閒時光',
    icon: '🍨',
    placeId: 'ChIJKY__v0q5bjQR-LIOfIzSRrY',
    mapUrl: 'https://maps.app.goo.gl/Jx1GvnrKKmZZM6kK8',
    tips: '糖廠內有許多懷舊建築，適合拍照',
    image: '/images/visit4.jpg'
  }
];

// 自定義行程景點庫
export const ALL_ATTRACTIONS: Attraction[] = [
  { id: 'theater', name: '萬國戲院', description: '懷舊電影院，復古拍照聖地', address: '622嘉義縣大林鎮平和街21-7號', placeId: 'ChIJ77QSQAmpQjQRM2I7zszor8c' },
  { id: 'sugar', name: '大林糖廠', description: '吃冰棒、散步舊鐵道', address: '622嘉義縣大林鎮大糖里399號', placeId: 'ChIJKY__v0q5bjQR-LIOfIzSRrY' },
  { id: 'art', name: '拾粹院文創藝術園區', description: '3D彩繪牆、鯖魚主題館', address: '622嘉義縣大林鎮大湖農場61號', placeId: 'ChIJ7XD51T-5bjQRfzicxqy_tPE' },
  { id: 'oldstreet', name: '大林老街', description: '在地美食與老街風情', address: '622嘉義縣大林鎮中山路37號', placeId: 'ChIJ9fuj2rm-bjQRIMmCG5d83gE' },
  { id: 'jordenice', name: '佐登妮絲城堡', description: '巴洛克風格歐式城堡', address: '622嘉義縣大林鎮大埔美園區三路15號', placeId: 'ChIJeTP05kC_bjQR5Unf6dNwmdw' },
  { id: 'gaia', name: '蓋婭莊園', description: '希臘風建築、美妝觀光工廠', address: '622011嘉義縣大林鎮大埔美園區七路18號', placeId: 'ChIJ2YCbxY6_bjQRgqaJqhDrrpg' },
  { id: 'yang', name: '老楊方城市', description: '方塊酥主題觀光工廠', address: '622嘉義縣大林鎮大埔美園區五路3號', placeId: 'ChIJGSVTyH6VbjQRbzwFG6SSOms' },
  { id: 'nightmarket', name: '大林夜市', description: '週一限定！在地人的美味廚房', address: '622嘉義縣大林鎮水源路49號號旁', placeId: 'ChIJ-WSNVbi-bjQRXAgoEvFNIRE' },
  { id: 'station', name: '大林車站', description: '大林火車站~', address: '號, No. 13中山路大林鎮嘉義縣622', placeId: 'ChIJscUcz7m-bjQRiZWYf1Z7ago' }
];

// IG 濾鏡景點配對
export const VIBE_SPOTS: VibeSpot[] = [
  {
    id: 'vintage-station',
    vibe: 'vintage',
    name: '大林火車站站長宿舍',
    description: '日式建築，完美詮釋懷舊感',
    placeId: 'ChIJscUcz7m-bjQRiZWYf1Z7ago',
    mapUrl: 'https://maps.google.com/?q=大林火車站站長宿舍',
  },
  {
    id: 'retro-theater',
    vibe: 'retro',
    name: '萬國戲院',
    description: '電影海報、老招牌，復古滿分',
    placeId: 'ChIJ77QSQAmpQjQRM2I7zszor8c',
    mapUrl: 'https://maps.app.goo.gl/poHvVwvz7dJ2WC7C7',
  },
  {
    id: 'industrial-factory',
    vibe: 'industrial',
    name: '大林糖廠舊倉庫',
    description: '工業遺跡，廢墟風格愛好者必訪',
    placeId: 'ChIJKY__v0q5bjQR-LIOfIzSRrY',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'nature-park',
    vibe: 'nature',
    name: '大林自然公園',
    description: '綠意盎然，療癒系景點',
    placeId: 'ChIJ_X_f-6W-bjQR7v5_7_7_7_8',
    mapUrl: 'https://maps.google.com/?q=大林自然公園',
  },
];

// 吃什麼轉盤選項
export const FOOD_WHEEL_OPTIONS: FoodOption[] = [
  {
    id: 'stinky-tofu-wheel',
    name: '臭豆腐',
    price: 65,
    emoji: '🍲',
    placeId: 'ChIJ4Wrfzrm-bjQRI9ofTIZQ3zk',
    mapUrl: 'https://maps.google.com/?q=大林臭豆腐',
  },
  {
    id: 'dog-tail-chicken-wheel',
    name: '狗尾雞',
    price: 580,
    emoji: '🍗',
    placeId: 'ChIJI-muZbm-bjQRk0UTmx4Ute4',
    mapUrl: 'https://maps.google.com/?q=大林狗尾雞',
  },
  {
    id: 'meat-soup-wheel',
    name: '肉羹湯',
    price: 40,
    emoji: '🍲',
    placeId: 'ChIJJX_-TaW-bjQR0iOk4OX8tno',
    mapUrl: 'https://maps.google.com/?q=大林肉羹湯',
  },
  {
    id: 'pork-rib-rice-wheel',
    name: '排骨飯',
    price: 110,
    emoji: '🍚',
    placeId: 'ChIJjyswWbe-bjQRrLrF_xH4w54',
    mapUrl: 'https://maps.google.com/?q=大林排骨飯',
  },
  {
    id: 'shaved-ice-wheel',
    name: '糖廠冰棒',
    price: 18,
    emoji: '🍦',
    placeId: 'ChIJKY__v0q5bjQR-LIOfIzSRrY',
    mapUrl: 'https://maps.google.com/?q=大林糖廠',
  },
  {
    id: 'grass-jelly-wheel',
    name: '燒仙草',
    price: 65,
    emoji: '🥣',
    placeId: 'ChIJU-Renee_bjQRlsUkkXuvW3g',
    mapUrl: 'https://maps.google.com/?q=大林燒仙草',
  },
  {
    id: 'oyster-omelette-wheel',
    name: '蚵仔煎',
    price: 70,
    emoji: '🥘',
    placeId: 'ChIJRcqCXLe-bjQRB9Rq5F6y910',
    mapUrl: 'https://maps.google.com/?q=大林蚵仔煎',
  },
  {
    id: 'beef-noodles-wheel',
    name: '牛肉麵',
    price: 100,
    emoji: '🍜',
    placeId: 'ChIJsYC8hs6_bjQRZrRfAsba4zM',
    mapUrl: 'https://maps.google.com/?q=大林牛肉麵',
  },
];

// 預算試算機提示訊息
export const BUDGET_MESSAGES = {
  generous: {
    emoji: '💰',
    text: '闊綽！你可以多點一份燒仙草。',
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
