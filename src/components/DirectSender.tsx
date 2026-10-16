import React, { useState, useEffect } from 'react';
import {
  Send,
  Copy,
  Check,
  QrCode,
  Clipboard,
  X,
  Phone,
  MessageCircle,
  PhoneCall,
  Settings,
} from 'lucide-react';
import {
  Country,
  cleanPhoneNumber,
  validatePhoneNumber,
  formatDisplayPhone,
  MESSAGING_PLATFORMS,
  PlatformConfig,
} from '../utils/phone';
import { HistoryItem } from './HistoryDrawer';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Props {
  onOpenQR: (url: string, phone: string, platformName: string) => void;
  onOpenSettings: () => void;
  onSaveToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  defaultCountry: Country;
  lang: Language;
  initialPhone?: string;
}

export const DirectSender: React.FC<Props> = ({
  onOpenQR,
  onOpenSettings,
  onSaveToHistory,
  defaultCountry,
  lang,
  initialPhone = '',
}) => {
  const [phoneInput, setPhoneInput] = useState<string>(initialPhone);
  const [message, setMessage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (initialPhone) {
      setPhoneInput(initialPhone);
    }
  }, [initialPhone]);

  // Clean phone number using defaultCountry dial code
  const cleanedPhone = cleanPhoneNumber(phoneInput, defaultCountry.dialCode);
  const validation = validatePhoneNumber(cleanedPhone);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPhoneInput(text);
        triggerToast(t.copied);
      }
    } catch {
      // Fallback
    }
  };

  const handleLaunch = (platform: PlatformConfig) => {
    if (!validation.isValid) {
      triggerToast(t.invalidPhone);
      return;
    }

    const targetUrl = platform.getUrl(cleanedPhone, message);

    onSaveToHistory({
      phone: cleanedPhone,
      dialCode: defaultCountry.dialCode,
      countryName: defaultCountry.name,
      countryFlag: defaultCountry.flag,
      platformId: platform.id,
      platformName: t[platform.nameKey],
      message: message.trim() || undefined,
    });

    // For Android intent, custom app schemes, sms, tel: use location.href so the OS intent opens directly without popup blocker
    if (
      targetUrl.startsWith('intent:') ||
      targetUrl.startsWith('whatsapp') ||
      targetUrl.startsWith('sms:') ||
      targetUrl.startsWith('tel:') ||
      targetUrl.startsWith('viber:')
    ) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    if (!validation.isValid) {
      triggerToast(t.invalidPhone);
      return;
    }
    const defaultUrl = `https://wa.me/${cleanedPhone}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`;
    navigator.clipboard.writeText(defaultUrl);
    setCopiedLink(true);
    triggerToast(t.copied);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper icon for platform
  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'call':
        return <PhoneCall className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="mb-4 text-center sm:text-start">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>{t.tagline}</span>
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 mt-1">
            <span>{t.defaultCountryHint}</span>
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 transition cursor-pointer"
              title={t.changeInSettings}
            >
              <span>{defaultCountry.flag}</span>
              <span>{defaultCountry.dialCode}</span>
              <Settings className="w-3 h-3 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* 1. Phone Input Row (Hidden country selector by the field as requested) */}
        <div className="space-y-1.5 mb-3.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="phone-input-field" className="font-semibold text-slate-300">
              {t.phoneLabel}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{t.paste}</span>
              </button>
              {phoneInput && (
                <button
                  type="button"
                  onClick={() => setPhoneInput('')}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.clear}</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950/80 border border-slate-700/80 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
            <input
              id="phone-input-field"
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full bg-transparent px-4 py-3 text-base sm:text-lg font-mono text-white placeholder-slate-500 focus:outline-none"
              autoComplete="tel"
            />
          </div>

          {/* Validation Feedback */}
          <div className="flex items-center justify-between text-[11px] px-1 min-h-[18px]">
            {phoneInput ? (
              validation.isValid ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{t.readyToSend}</span>
                  <strong className="font-mono">{formatDisplayPhone(cleanedPhone)}</strong>
                </span>
              ) : (
                <span className="text-amber-400 font-medium">
                  {t.invalidPhone}
                </span>
              )
            ) : (
              <span className="text-slate-500 text-[11px]">
                {t.defaultCountryDesc}
              </span>
            )}
          </div>
        </div>

        {/* 2. Message Area (Compact with 2 rows) */}
        <div className="space-y-1.5 mb-3.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="message-input-field" className="font-semibold text-slate-300">
              {t.messageLabel}
            </label>
            <span className="text-slate-500 font-mono text-[11px]">{message.length}</span>
          </div>

          <textarea
            id="message-input-field"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder={t.messagePlaceholder}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition resize-none"
          />

          {/* Quick text chips (Compact) */}
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            <span className="text-[10px] text-slate-400 font-medium">{t.quickText}</span>
            {t.templates.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(tmpl.text)}
                className="text-[10px] py-0.5 px-2 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 transition cursor-pointer"
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Compact Apps Grid - Zero scrolling required! */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">{t.sendVia}:</span>
            <span className="text-[10px] text-emerald-400">{t.openDirectly}</span>
          </div>

          {/* Primary Top Messaging Apps (WhatsApp, WhatsApp Business, Telegram, SMS) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MESSAGING_PLATFORMS.slice(0, 4).map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => handleLaunch(platform)}
                className="group p-2.5 rounded-xl border border-slate-700/70 hover:border-slate-500 bg-slate-950/60 hover:bg-slate-800/80 transition flex items-center justify-between gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition">
                    {t[platform.nameKey]}
                  </span>
                </div>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition shrink-0" />
              </button>
            ))}
          </div>

          {/* Secondary Messaging Apps (Signal, Viber, Call) */}
          <div className="grid grid-cols-3 gap-2">
            {MESSAGING_PLATFORMS.slice(4).map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => handleLaunch(platform)}
                className="group py-2 px-2.5 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/40 hover:bg-slate-800/60 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                  {t[platform.nameKey]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Instant Action Utilities: Copy Link & Show QR Code */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? t.copied : t.copyLink}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!validation.isValid) {
                triggerToast(t.invalidPhone);
                return;
              }
              const defaultUrl = `https://wa.me/${cleanedPhone}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`;
              onOpenQR(defaultUrl, cleanedPhone, t.whatsapp);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.qrCode}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
