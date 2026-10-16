import React from 'react';
import { Download, Smartphone, CheckCircle, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">DirectMsg Mobile App (APK / PWA)</h2>
            <p className="text-xs text-slate-400">Install without Google Play Store directly to your home screen</p>
          </div>
        </div>

        {isInstalled ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white">Already Installed!</h3>
            <p className="text-sm text-slate-400">
              DirectMsg is currently running as a native standalone application on your device.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-slate-300">
            {isInstallable && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                <p className="text-xs text-emerald-300 font-medium mb-3">
                  Direct installation is ready on your browser!
                </p>
                <button
                  onClick={async () => {
                    const ok = await install();
                    if (ok) onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Install App (WebAPK / Standalone)
                </button>
              </div>
            )}

            {/* Android instructions */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="text-base">🤖</span> Android Installation (Chrome / Samsung / Brave):
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                <li>Tap the <strong>three dots menu (⋮)</strong> in top right corner.</li>
                <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                <li>Tap <strong>Install</strong>. Android will build a verified native WebAPK with full offline capabilities!</li>
              </ol>
            </div>

            {/* iOS instructions */}
            {isIOS && (
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <div className="flex items-center gap-2 text-white font-medium mb-2">
                  <span className="text-base">🍏</span> iOS Installation (Safari):
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                  <li>Tap the <strong>Share</strong> icon in the bottom Safari bar.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top-right corner.</li>
                </ol>
              </div>
            )}

            {/* Privacy note */}
            <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                100% Private &amp; Secure: DirectMsg does not upload your contacts to external servers. Links launch official messaging apps directly.
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
