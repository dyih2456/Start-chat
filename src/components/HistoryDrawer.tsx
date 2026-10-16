import React from 'react';
import { Clock, Star, Trash2, ArrowUpRight, MessageSquare, X } from 'lucide-react';
import { formatDisplayPhone } from '../utils/phone';
import { Language, TRANSLATIONS } from '../utils/translations';

export interface HistoryItem {
  id: string;
  phone: string;
  dialCode: string;
  countryName: string;
  countryFlag: string;
  platformId: string;
  platformName: string;
  message?: string;
  timestamp: number;
  isStarred?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  lang: Language;
}

export const HistoryDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onSelect,
  onToggleStar,
  onDelete,
  onClearAll,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  if (!isOpen) return null;

  const sortedItems = [...items].sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-sm bg-slate-900 border-x border-slate-800 h-full flex flex-col p-5 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-white text-base">{t.recentTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 hover:bg-rose-500/10 rounded-lg transition"
                title="Clear all"
              >
                {t.clearAll}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
          {sortedItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-xs">{t.noRecent}</p>
            </div>
          ) : (
            sortedItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition ${
                  item.isStarred
                    ? 'bg-amber-500/5 border-amber-500/30'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.countryFlag}</span>
                    <button
                      onClick={() => onSelect(item)}
                      className="font-mono font-semibold text-white hover:text-emerald-400 text-xs transition"
                    >
                      {formatDisplayPhone(item.phone)}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleStar(item.id)}
                      className={`p-1 rounded transition ${
                        item.isStarred
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.isStarred ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">{item.platformName}</span>
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {item.message && (
                  <p className="mt-1 text-[11px] text-slate-300 line-clamp-1 italic bg-slate-950/60 p-1 rounded">
                    &quot;{item.message}&quot;
                  </p>
                )}

                <button
                  onClick={() => onSelect(item)}
                  className="mt-2 w-full flex items-center justify-center gap-1 text-[11px] py-1 bg-slate-700/50 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-lg transition font-medium"
                >
                  <span>{t.chatAgain}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
