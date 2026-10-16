import React from 'react';
import {
  Clock,
  Settings,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Props {
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  historyCount: number;
  lang: Language;
}

export const Navbar: React.FC<Props> = ({
  onOpenHistory,
  onOpenSettings,
  onOpenHelp,
  historyCount,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-[#0E1524] rounded-[10px] flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <span className="font-bold text-white text-base tracking-tight font-sans">
            {t.appName}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">

          {/* History drawer button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer min-h-[36px]"
            title={t.recent}
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs">{t.recent}</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] font-bold">
                {historyCount}
              </span>
            )}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            title={t.settings}
            aria-label={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            title={isRTL ? 'معلومات عن التطبيق والمطور' : 'About & Developer'}
            aria-label="About"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
