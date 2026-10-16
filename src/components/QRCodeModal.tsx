import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, QrCode as QrIcon, Copy, Check, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  phoneNumber: string;
  platformName: string;
  lang: Language;
}

export const QRCodeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  url,
  phoneNumber,
  platformName,
  lang,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#022c22',
          light: '#ffffff',
        },
      })
        .then((res) => setDataUrl(res))
        .catch((err) => console.error('Failed to generate QR:', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <QrIcon className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-white text-sm">{t.qrCode}</h2>
        </div>

        <p className="text-[11px] text-slate-400 text-center mb-3">
          +{phoneNumber} ({platformName})
        </p>

        {/* QR container */}
        <div className="p-2.5 bg-white rounded-xl shadow-lg mb-3 border border-emerald-500/20">
          {dataUrl ? (
            <img src={dataUrl} alt={`Direct chat QR code for ${phoneNumber}`} className="w-48 h-48 rounded-lg" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
              ...
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.copied : t.copyLink}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.openDirectly}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
