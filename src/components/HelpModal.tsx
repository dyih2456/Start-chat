import React from 'react';
import { X, ShieldCheck, Zap, HelpCircle, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HelpModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/80 backdrop-blur-sm animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-md bg-[#121927] border border-slate-800 rounded-3xl shadow-2xl p-5 md:p-6 text-slate-100 max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-sans">{t.appName}</h2>
            <p className="text-xs text-slate-400">{t.tagline}</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300">
          {/* App Overview */}
          <div className="p-3.5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{t.aboutApp}</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {t.appDescription}
            </p>
          </div>

          {/* Features Highlights */}
          <div className="space-y-1.5 p-3.5 bg-[#0E1524] rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300 block mb-1">
              {isRTL ? 'المميزات الرئيسية:' : 'Key Features:'}
            </span>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRTL ? 'دعم واتساب العادي وواتساب أعمال بشكل منفصل تماماً' : 'Separate WhatsApp & WhatsApp Business intent isolation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRTL ? 'إرسال مباشر عبر تليجرام، SMS، واتصال هاتف' : 'Direct send via Telegram, SMS, and direct Call'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRTL ? 'رمز دولة افتراضي دائم (مثل العراق 🇮🇶 +964)' : 'Permanent default country dial code (e.g. Iraq +964)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isRTL ? 'نص سريع لطلب التوصيل والموقع بنقرة واحدة' : '1-tap quick text for delivery order & location request'}</span>
              </div>
            </div>
          </div>

          {/* Developer GitHub Card as requested by user */}
          <div className="p-3.5 bg-gradient-to-r from-[#0E1524] to-[#141E33] border border-emerald-500/30 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Github className="w-4 h-4" />
              <span>{t.developer}</span>
            </span>
            <p className="text-[11px] text-slate-400">
              {isRTL ? 'يمكنك متابعة وتصفح المشاريع عبر حساب GitHub الرسمي:' : 'Explore open projects on GitHub:'}
            </p>
            <a
              href="https://github.com/admin-art1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 bg-[#0B101B] hover:bg-[#0F1626] text-white rounded-xl border border-slate-700/80 hover:border-emerald-500/50 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-xs group-hover:text-emerald-400 transition">admin-art1</span>
                  <span className="text-[10px] text-slate-400">github.com/admin-art1</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
            </a>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{t.privacyNotice}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
};
