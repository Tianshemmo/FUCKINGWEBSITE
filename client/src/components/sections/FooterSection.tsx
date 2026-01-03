/**
 * 頁尾組件
 * 包含聯絡資訊和社群連結
 */

import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container">
        {/* 主要內容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 品牌 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-3">
              大林慢遊
            </h3>
            <p className="text-sm opacity-80">
              銅板系生存指南 - 為大學生設計的大林一日遊旅遊指南
            </p>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 className="font-display text-lg font-bold mb-3">
              快速連結
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#food-map" className="opacity-80 hover:opacity-100 transition-opacity">
                  美食地圖
                </a>
              </li>
              <li>
                <a href="#itinerary" className="opacity-80 hover:opacity-100 transition-opacity">
                  行程規劃
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  預算試算機
                </a>
              </li>
            </ul>
          </div>

          {/* 聯絡方式 */}
          <div>
            <h4 className="font-display text-lg font-bold mb-3">
              除了借錢以外的問題都可問
            </h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                onClick={() => window.open('mailto:hello@daling.tw', '_blank')}
              >
                <Mail size={16} className="mr-2" />
                hello@daling.tw
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                onClick={() => window.open('https://line.me/ti/p/daling', '_blank')}
              >
                <MessageCircle size={16} className="mr-2" />
                LINE 官方帳號
              </Button>
            </div>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-secondary-foreground/20 mb-8" />

        {/* 底部資訊 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>
            © 2024 大林慢遊 - 銅板系生存指南. 為大學生設計.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">
              隱私政策
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              使用條款
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              回饋建議
            </a>
          </div>
        </div>

        {/* 彩蛋 */}
        <div className="mt-8 text-center text-xs opacity-50">
          <p>
            💡 如果你喜歡大林，別忘了分享給朋友！每一個分享都能幫助更多人發現大林的美好。
          </p>
        </div>
      </div>
    </footer>
  );
}
