import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  QrCode,
  Clipboard,
  X,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
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
import {
  WhatsAppIcon,
  WhatsAppBusinessIcon,
  TelegramIcon,
  SmsIcon,
  PhoneCallIcon,
} from './BrandIcons';

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
      // Browser permissions or mobile clipboard fallback
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

  const deliveryText = 'السلام عليكم عدكم طلب توصيل يرجى ارسال الموقع';
  const isDeliveryTextActive = message === deliveryText;

  const toggleDeliveryText = () => {
    if (isDeliveryTextActive) {
      setMessage('');
    } else {
      setMessage(deliveryText);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-[#121927] border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        {/* Country & Dial Code Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{defaultCountry.flag}</span>
            <span className="text-sm font-semibold text-white">
              {isRTL ? defaultCountry.nameAr : defaultCountry.name}
            </span>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {defaultCountry.dialCode}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-emerald-400 transition cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-800"
            title={t.changeInSettings}
          >
            <span>{isRTL ? 'تغيير الدولة' : 'Change country'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. Phone Input Row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="phone-input-field" className="font-semibold text-slate-200">
              {t.phoneLabel}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded-lg"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{t.paste}</span>
              </button>
              {phoneInput && (
                <button
                  type="button"
                  onClick={() => setPhoneInput('')}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition cursor-pointer px-1.5 py-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.clear}</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative rounded-2xl bg-[#0B111C] border border-slate-700/80 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
            <input
              id="phone-input-field"
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder=""
              className="w-full bg-transparent px-4 py-3.5 text-2xl font-bold font-mono text-white focus:outline-none tracking-wide"
              autoComplete="tel"
            />
          </div>

          {/* Validation Feedback */}
          <div className="flex items-center text-xs px-1 min-h-[20px]">
            {phoneInput ? (
              validation.isValid ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.readyToSend}</span>
                  <strong className="font-mono font-bold text-white tracking-wider">{formatDisplayPhone(cleanedPhone)}</strong>
                </span>
              ) : (
                <span className="text-amber-400 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.invalidPhone}</span>
                </span>
              )
            ) : (
              <span className="text-slate-500 text-[11px]">
                {isRTL
                  ? 'اكتب الرقم وسيقوم التطبيق بإضافة المفتاح الدولي تلقائياً'
                  : 'Enter the number directly; country code is added automatically'}
              </span>
            )}
          </div>
        </div>

        {/* 2. Quick Delivery Order Preset (Requested exclusively by user) */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={toggleDeliveryText}
            className={`w-full text-right sm:text-start flex items-center justify-between gap-3 p-3 rounded-2xl border transition cursor-pointer ${
              isDeliveryTextActive
                ? 'bg-emerald-500/15 border-emerald-500/60 text-white shadow-sm'
                : 'bg-[#0E1524] hover:bg-[#141D30] border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span className="text-lg shrink-0 mt-0.5">📦</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-emerald-400">
                  {isRTL ? 'نص سريع لطلب التوصيل' : 'Quick Delivery Message'}
                </span>
                <span className="text-xs font-medium text-slate-200 leading-relaxed break-words">
                  {deliveryText}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1 self-center">
              {isDeliveryTextActive ? (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg">
                  {isRTL ? 'إدراج' : 'Insert'}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* 3. Custom Message (Optional) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
            <label htmlFor="message-input-field" className="font-medium text-slate-300">
              {t.messageLabel}
            </label>
            {message.length > 0 && (
              <span className="font-mono text-[11px] text-slate-500">{message.length}</span>
            )}
          </div>

          <textarea
            id="message-input-field"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder={isRTL ? 'اكتب رسالة إضافية هنا (اختياري)...' : 'Type custom message here (optional)...'}
            className="w-full bg-[#0B111C] border border-slate-700/70 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition resize-none"
          />
        </div>

        {/* 4. Action Buttons (Authentic Brands, High Contrast, Thumb-Friendly) */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-slate-400 block px-0.5">
            {t.sendVia}:
          </span>

          {/* Row 1: WhatsApp and WhatsApp Business */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Standard WhatsApp */}
            <button
              type="button"
              onClick={() => handleLaunch(MESSAGING_PLATFORMS[0])}
              className="py-3.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition cursor-pointer active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>{t.whatsapp}</span>
            </button>

            {/* WhatsApp Business (Strictly com.whatsapp.w4b on Android) */}
            <button
              type="button"
              onClick={() => handleLaunch(MESSAGING_PLATFORMS[1])}
              className="py-3.5 px-3 rounded-2xl bg-[#008069] hover:bg-[#00705c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#008069]/20 transition cursor-pointer active:scale-[0.98]"
            >
              <WhatsAppBusinessIcon className="w-5 h-5 shrink-0" />
              <span>{t.whatsappBiz}</span>
            </button>
          </div>

          {/* Row 2: Telegram, SMS, Direct Call */}
          <div className="grid grid-cols-3 gap-2">
            {/* Telegram */}
            <button
              type="button"
              onClick={() => handleLaunch(MESSAGING_PLATFORMS[2])}
              className="py-2.5 px-2 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec4] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
            >
              <TelegramIcon className="w-4 h-4 shrink-0" />
              <span>{t.telegram}</span>
            </button>

            {/* SMS */}
            <button
              type="button"
              onClick={() => handleLaunch(MESSAGING_PLATFORMS[3])}
              className="py-2.5 px-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
            >
              <SmsIcon className="w-4 h-4 shrink-0" />
              <span>{t.sms}</span>
            </button>

            {/* Direct Call */}
            <button
              type="button"
              onClick={() => handleLaunch(MESSAGING_PLATFORMS[6])}
              className="py-2.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <PhoneCallIcon className="w-4 h-4 shrink-0" />
              <span>{t.call}</span>
            </button>
          </div>
        </div>

        {/* 5. Bottom Utilities: Copy Link & Show QR Code */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-700/50"
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
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-700/50"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.qrCode}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
