import React from 'react';
import {
  MessageSquare,
  Clock,
  Settings,
  HelpCircle,
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
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Logo and Brand: prototype~w */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight font-mono">
              {t.appName}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* History drawer button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
            title={t.recent}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.recent}</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
            title={t.settings}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.settings}</span>
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            title="Help"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
