import React, { useState } from 'react';
import { Settings, Globe, Check, X, Search, ShieldCheck } from 'lucide-react';
import { COUNTRIES, Country } from '../utils/phone';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCountry: Country;
  onSelectCountry: (country: Country) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentCountry,
  onSelectCountry,
  currentLang,
  onSelectLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[currentLang];
  const isRTL = currentLang === 'ar';

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.nameAr.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/80 backdrop-blur-sm animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-lg bg-[#121927] border border-slate-800 rounded-3xl shadow-2xl p-5 md:p-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.settingsTitle}</h2>
              <p className="text-xs text-slate-400">{t.defaultCountryDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          {/* Language Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{t.language}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectLang('ar')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                  currentLang === 'ar'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-[#0E1524] text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>العربية</span>
                {currentLang === 'ar' && <Check className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('en')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-[#0E1524] text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>English</span>
                {currentLang === 'en' && <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Default Country Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {t.defaultCountry}
              </label>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                {currentCountry.flag} {currentCountry.dialCode} ({isRTL ? currentCountry.nameAr : currentCountry.name})
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className={`w-4 h-4 absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-slate-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchCountry}
                className={`w-full bg-[#0B111C] border border-slate-700 rounded-xl py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition`}
              />
            </div>

            {/* Countries List */}
            <div className="border border-slate-800 rounded-2xl bg-[#0B111C] max-h-56 overflow-y-auto divide-y divide-slate-800/60">
              {filteredCountries.map((c) => {
                const isSelected = currentCountry.code === c.code && currentCountry.dialCode === c.dialCode;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => onSelectCountry(c)}
                    className={`w-full flex items-center justify-between p-3 text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-300 font-semibold'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{c.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-white">
                          {isRTL ? c.nameAr : c.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {isRTL ? c.name : c.nameAr}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {c.dialCode}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-[#0E1524] border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{t.privacyNotice}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
};
