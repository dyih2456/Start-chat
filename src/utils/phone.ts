/**
 * Country data and telephone utilities
 */

export interface Country {
  code: string;
  name: string;
  nameAr: string;
  dialCode: string; // e.g. "+964", "+1", "+966"
  flag: string;
  format: string; // example placeholder
}

export const COUNTRIES: Country[] = [
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', dialCode: '+964', flag: '🇮🇶', format: '770 123 4567' },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', dialCode: '+966', flag: '🇸🇦', format: '50 123 4567' },
  { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات', dialCode: '+971', flag: '🇦🇪', format: '50 123 4567' },
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', dialCode: '+20', flag: '🇪🇬', format: '10 1234 5678' },
  { code: 'US', name: 'United States', nameAr: 'أمريكا (الولايات المتحدة)', dialCode: '+1', flag: '🇺🇸', format: '(555) 000-0000' },
  { code: 'GB', name: 'United Kingdom', nameAr: 'المملكة المتحدة (بريطانيا)', dialCode: '+44', flag: '🇬🇧', format: '7911 123456' },
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', dialCode: '+962', flag: '🇯🇴', format: '7 9123 4567' },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', dialCode: '+965', flag: '🇰🇼', format: '9123 4567' },
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', dialCode: '+974', flag: '🇶🇦', format: '3312 3456' },
  { code: 'OM', name: 'Oman', nameAr: 'عُمان', dialCode: '+968', flag: '🇴🇲', format: '9123 4567' },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', dialCode: '+973', flag: '🇧🇭', format: '3612 3456' },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', dialCode: '+961', flag: '🇱🇧', format: '70 123 456' },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا', dialCode: '+963', flag: '🇸🇾', format: '933 123 456' },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', dialCode: '+970', flag: '🇵🇸', format: '59 123 4567' },
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن', dialCode: '+967', flag: '🇾🇪', format: '71 123 4567' },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا', dialCode: '+90', flag: '🇹🇷', format: '532 123 45 67' },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', dialCode: '+49', flag: '🇩🇪', format: '151 23456789' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا', dialCode: '+33', flag: '🇫🇷', format: '6 12 34 56 78' },
  { code: 'SE', name: 'Sweden', nameAr: 'السويد', dialCode: '+46', flag: '🇸🇪', format: '70 123 45 67' },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا', dialCode: '+31', flag: '🇳🇱', format: '6 12345678' },
  { code: 'CA', name: 'Canada', nameAr: 'كندا', dialCode: '+1', flag: '🇨🇦', format: '(555) 000-0000' },
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا', dialCode: '+61', flag: '🇦🇺', format: '412 345 678' },
  { code: 'IN', name: 'India', nameAr: 'الهند', dialCode: '+91', flag: '🇮🇳', format: '98765 43210' },
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان', dialCode: '+92', flag: '🇵🇰', format: '300 1234567' },
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا', dialCode: '+62', flag: '🇮🇩', format: '812 3456 789' },
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا', dialCode: '+60', flag: '🇲🇾', format: '12 345 6789' },
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب', dialCode: '+212', flag: '🇲🇦', format: '612 345678' },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', dialCode: '+213', flag: '🇩🇿', format: '551 23 45 67' },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس', dialCode: '+216', flag: '🇹🇳', format: '20 123 456' },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا', dialCode: '+218', flag: '🇱🇾', format: '91 123 4567' },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان', dialCode: '+249', flag: '🇸🇩', format: '91 123 4567' },
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا', dialCode: '+234', flag: '🇳🇬', format: '802 123 4567' },
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل', dialCode: '+55', flag: '🇧🇷', format: '11 98765-4321' },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا', dialCode: '+34', flag: '🇪🇸', format: '612 34 56 78' },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا', dialCode: '+39', flag: '🇮🇹', format: '320 1234567' },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا', dialCode: '+7', flag: '🇷🇺', format: '912 345-67-89' },
];

/**
 * Normalizes input phone string:
 * - If user typed a full international number with + or 00, cleans and uses it.
 * - If user typed local digits, strips leading 0 (trunk code) and prepends default dial code digits.
 * Returns pure digits without leading '+' or spaces (e.g., '9647701234567').
 */
export function cleanPhoneNumber(rawInput: string, defaultDialCode: string = '+964'): string {
  if (!rawInput) return '';

  let str = rawInput.trim();

  // If starts with 00 (common international exit code), replace with +
  if (str.startsWith('00')) {
    str = '+' + str.slice(2);
  }

  // Check if international format (+...)
  if (str.startsWith('+')) {
    const digits = str.replace(/\D/g, '');
    return digits;
  }

  // Pure digits of raw input
  let localDigits = str.replace(/\D/g, '');
  if (!localDigits) return '';

  // Clean dial code (e.g. "+964" -> "964")
  const dialDigits = defaultDialCode.replace(/\D/g, '');

  // If user already typed the dial code at the beginning, don't duplicate it
  if (localDigits.startsWith(dialDigits) && localDigits.length > dialDigits.length + 5) {
    return localDigits;
  }

  // If local number starts with leading 0 (trunk code like Iraq 0770... or UK 07911...), strip it
  if (localDigits.startsWith('0')) {
    localDigits = localDigits.replace(/^0+/, '');
  }

  return dialDigits + localDigits;
}

/**
 * Validates E.164 phone digit length (between 7 and 15 digits)
 */
export function validatePhoneNumber(cleanedPhone: string): { isValid: boolean; error?: string } {
  if (!cleanedPhone) {
    return { isValid: false, error: 'Please enter a phone number' };
  }

  if (!/^\d+$/.test(cleanedPhone)) {
    return { isValid: false, error: 'Phone number must contain only numbers' };
  }

  if (cleanedPhone.length < 7) {
    return { isValid: false, error: 'Phone number is too short (min 7 digits)' };
  }

  if (cleanedPhone.length > 15) {
    return { isValid: false, error: 'Phone number is too long (max 15 digits according to ITU-T E.164)' };
  }

  return { isValid: true };
}

/**
 * Formats a cleaned phone number for friendly human display (e.g. +964 770 123 4567)
 */
export function formatDisplayPhone(cleanedPhone: string): string {
  if (!cleanedPhone) return '';
  return `+${cleanedPhone}`;
}

/**
 * Device detection helpers
 */
export function isAndroidDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent || '');
}

export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent || '');
}

/**
 * Universal web URL for WhatsApp
 */
export function buildUniversalWhatsAppUrl(cleanedPhone: string, text: string = ''): string {
  const trimmed = text.trim();
  return trimmed
    ? `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(trimmed)}`
    : `https://wa.me/${cleanedPhone}`;
}

/**
 * URL builder for standard WhatsApp (com.whatsapp)
 */
export function buildWhatsAppUrl(cleanedPhone: string, text: string = ''): string {
  const trimmed = text.trim();
  const textParam = trimmed ? `&text=${encodeURIComponent(trimmed)}` : '';
  const textQuery = trimmed ? `?text=${encodeURIComponent(trimmed)}` : '';
  const fallback = encodeURIComponent(`https://wa.me/${cleanedPhone}${textQuery}`);

  if (isAndroidDevice()) {
    // Specifically target standard WhatsApp package
    return `intent://send?phone=${cleanedPhone}${textParam}#Intent;package=com.whatsapp;scheme=whatsapp;S.browser_fallback_url=${fallback};end`;
  }

  return `https://wa.me/${cleanedPhone}${textQuery}`;
}

/**
 * URL builder specifically targeting WhatsApp Business (com.whatsapp.w4b)
 */
export function buildWhatsAppBusinessUrl(cleanedPhone: string, text: string = ''): string {
  const trimmed = text.trim();
  const textParam = trimmed ? `&text=${encodeURIComponent(trimmed)}` : '';
  const textQuery = trimmed ? `?text=${encodeURIComponent(trimmed)}` : '';
  const fallback = encodeURIComponent(`https://wa.me/${cleanedPhone}${textQuery}`);

  // When on Android, ALWAYS use the official Android Intent strictly targeting com.whatsapp.w4b
  // This prevents Android from defaulting to standard WhatsApp!
  if (isAndroidDevice()) {
    return `intent://send?phone=${cleanedPhone}${textParam}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;S.browser_fallback_url=${fallback};end`;
  }

  // On iOS, attempt to launch WhatsApp Business custom scheme
  if (isIOSDevice()) {
    return `whatsapp-business://send?phone=${cleanedPhone}${textParam}`;
  }

  // Fallback for desktop / web preview
  return `https://wa.me/${cleanedPhone}${textQuery}`;
}

/**
 * Helper to explicitly generate the WhatsApp Business intent string (for tests & deep linking)
 */
export function buildWhatsAppBusinessIntent(cleanedPhone: string, text: string = ''): string {
  const trimmed = text.trim();
  const textParam = trimmed ? `&text=${encodeURIComponent(trimmed)}` : '';
  const fallback = encodeURIComponent(buildUniversalWhatsAppUrl(cleanedPhone, text));
  return `intent://send?phone=${cleanedPhone}${textParam}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;S.browser_fallback_url=${fallback};end`;
}

export function buildSmsUrl(cleanedPhone: string, text: string = ''): string {
  return text.trim() 
    ? `sms:+${cleanedPhone}?body=${encodeURIComponent(text.trim())}`
    : `sms:+${cleanedPhone}`;
}

export function buildTelegramUrl(cleanedPhone: string, text: string = ''): string {
  const base = `https://t.me/+${cleanedPhone}`;
  return text.trim() ? `${base}?text=${encodeURIComponent(text.trim())}` : base;
}

export function buildSignalUrl(cleanedPhone: string, _text: string = ''): string {
  return `https://signal.me/#p/+${cleanedPhone}`;
}

export function buildViberUrl(cleanedPhone: string): string {
  return `viber://chat?number=%2B${cleanedPhone}`;
}

export function buildTelUrl(cleanedPhone: string): string {
  return `tel:+${cleanedPhone}`;
}

export interface PlatformConfig {
  id: 'whatsapp' | 'whatsapp_biz' | 'telegram' | 'sms' | 'signal' | 'viber' | 'call';
  nameKey: 'whatsapp' | 'whatsappBiz' | 'telegram' | 'sms' | 'signal' | 'viber' | 'call';
  color: string;
  hoverColor: string;
  bgGradient: string;
  badgeKey: 'popular' | 'business' | 'popular' | 'popular' | 'business' | 'popular' | 'popular';
  getUrl: (phone: string, text?: string) => string;
}

export const MESSAGING_PLATFORMS: PlatformConfig[] = [
  {
    id: 'whatsapp',
    nameKey: 'whatsapp',
    badgeKey: 'popular',
    color: '#25D366',
    hoverColor: 'hover:bg-emerald-600',
    bgGradient: 'from-emerald-500 to-green-600',
    getUrl: buildWhatsAppUrl,
  },
  {
    id: 'whatsapp_biz',
    nameKey: 'whatsappBiz',
    badgeKey: 'business',
    color: '#128C7E',
    hoverColor: 'hover:bg-teal-700',
    bgGradient: 'from-teal-600 to-emerald-800',
    getUrl: buildWhatsAppBusinessUrl,
  },
  {
    id: 'telegram',
    nameKey: 'telegram',
    badgeKey: 'popular',
    color: '#0088CC',
    hoverColor: 'hover:bg-sky-600',
    bgGradient: 'from-sky-500 to-blue-600',
    getUrl: buildTelegramUrl,
  },
  {
    id: 'sms',
    nameKey: 'sms',
    badgeKey: 'popular',
    color: '#3B82F6',
    hoverColor: 'hover:bg-blue-600',
    bgGradient: 'from-blue-600 to-indigo-700',
    getUrl: buildSmsUrl,
  },
  {
    id: 'signal',
    nameKey: 'signal',
    badgeKey: 'business',
    color: '#3A76F0',
    hoverColor: 'hover:bg-indigo-600',
    bgGradient: 'from-indigo-600 to-blue-700',
    getUrl: buildSignalUrl,
  },
  {
    id: 'viber',
    nameKey: 'viber',
    badgeKey: 'business',
    color: '#7360F2',
    hoverColor: 'hover:bg-purple-600',
    bgGradient: 'from-purple-600 to-indigo-800',
    getUrl: buildViberUrl,
  },
  {
    id: 'call',
    nameKey: 'call',
    badgeKey: 'popular',
    color: '#10B981',
    hoverColor: 'hover:bg-emerald-600',
    bgGradient: 'from-emerald-500 to-teal-700',
    getUrl: buildTelUrl,
  },
];
