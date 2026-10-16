import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DirectSender } from './components/DirectSender';
import { HistoryDrawer, HistoryItem } from './components/HistoryDrawer';
import { QRCodeModal } from './components/QRCodeModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { COUNTRIES, Country } from './utils/phone';
import { Language, TRANSLATIONS } from './utils/translations';
import { WifiOff } from 'lucide-react';

export default function App() {
  // Language preference: Default to Arabic ('ar') as requested
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('direct_chat_lang');
      return (stored === 'en' || stored === 'ar') ? stored : 'ar';
    } catch {
      return 'ar';
    }
  });

  // Default Country: Default to Iraq ('IQ' / '+964')
  const [defaultCountry, setDefaultCountry] = useState<Country>(() => {
    try {
      const storedCode = localStorage.getItem('direct_chat_country_code');
      const found = COUNTRIES.find((c) => c.code === storedCode);
      return found || COUNTRIES[0]; // Iraq is index 0
    } catch {
      return COUNTRIES[0];
    }
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('direct_chat_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<string>('');

  const [qrModal, setQrModal] = useState<{
    isOpen: boolean;
    url: string;
    phone: string;
    platformName: string;
  }>({
    isOpen: false,
    url: '',
    phone: '',
    platformName: '',
  });

  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  // Persist language
  useEffect(() => {
    try {
      localStorage.setItem('direct_chat_lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    } catch (e) {
      console.warn('Failed to save language', e);
    }
  }, [lang, isRTL]);

  // Persist default country
  useEffect(() => {
    try {
      localStorage.setItem('direct_chat_country_code', defaultCountry.code);
    } catch (e) {
      console.warn('Failed to save default country', e);
    }
  }, [defaultCountry]);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem('direct_chat_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history', e);
    }
  }, [history]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSaveToHistory = (itemData: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...itemData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      isStarred: false,
    };

    setHistory((prev) => {
      const filtered = prev.filter(
        (p) => !(p.phone === newItem.phone && p.platformId === newItem.platformId)
      );
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const handleToggleStar = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isStarred: !item.isStarred } : item
      )
    );
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedPhone(item.phone);
    setIsHistoryOpen(false);
  };

  const handleOpenQR = (url: string, phone: string, platformName: string) => {
    setQrModal({
      isOpen: true,
      url,
      phone,
      platformName,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Offline Alert Indicator */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{isRTL ? 'أنت غير متصل بالإنترنت حالياً' : 'You are currently offline'}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        historyCount={history.length}
        lang={lang}
      />

      {/* Main Container - Compact and optimized for zero-scroll on mobile */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-start">
        <DirectSender
          onOpenQR={handleOpenQR}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onSaveToHistory={handleSaveToHistory}
          defaultCountry={defaultCountry}
          lang={lang}
          initialPhone={selectedPhone}
        />
      </main>

      {/* Minimal Clean Footer */}
      <footer className="border-t border-slate-900 bg-[#090D14] py-3 text-center text-xs text-slate-500">
        <div className="max-w-xl mx-auto px-4 flex items-center justify-between">
          <span className="font-semibold text-slate-400">direct~chat</span>
          <span className="text-[11px] text-slate-500">{t.tagline}</span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onSelect={handleSelectHistoryItem}
        onToggleStar={handleToggleStar}
        onDelete={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
        lang={lang}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentCountry={defaultCountry}
        onSelectCountry={(c) => {
          setDefaultCountry(c);
        }}
        currentLang={lang}
        onSelectLang={(l) => {
          setLang(l);
        }}
      />

      <QRCodeModal
        isOpen={qrModal.isOpen}
        onClose={() => setQrModal((prev) => ({ ...prev, isOpen: false }))}
        url={qrModal.url}
        phoneNumber={qrModal.phone}
        platformName={qrModal.platformName}
        lang={lang}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        lang={lang}
      />
    </div>
  );
}
