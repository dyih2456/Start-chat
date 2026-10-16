import fs from 'fs';
import path from 'path';

const qrcodeBundle = fs.readFileSync('.qrcode-bundle.js', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>direct~chat | مراسلة فورية بدون حفظ الرقم</title>
  <meta name="description" content="تطبيق direct~chat لمراسلة أي رقم عبر واتساب، واتساب أعمال، تليجرام، وSMS مباشرة بدون الحاجة لحفظ جهة الاتصال.">
  <meta name="theme-color" content="#0B0F17">
  
  <!-- Fonts with offline fallback -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #0B0F17;
      --card-bg: #121927;
      --card-border: #1E293B;
      --accent: #10B981;
      --accent-hover: #059669;
      --accent-light: rgba(16, 185, 129, 0.15);
      --text-main: #F1F5F9;
      --text-muted: #94A3B8;
      --danger: #EF4444;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    /* Container */
    .app-container {
      max-width: 540px;
      width: 100%;
      margin: 0 auto;
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Header */
    header {
      background: #090D14;
      border-bottom: 1px solid #162032;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 40;
    }
    .header-inner {
      max-width: 540px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.5px;
      color: #FFF;
      text-decoration: none;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent);
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-icon {
      background: #121927;
      border: 1px solid #1E293B;
      color: var(--text-muted);
      border-radius: 10px;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }
    .btn-icon:hover {
      color: #FFF;
      border-color: #334155;
      background: #182235;
    }
    .btn-icon-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      background: var(--accent);
      color: #062419;
      font-size: 10px;
      font-weight: 800;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Cards */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 18px;
      margin-bottom: 14px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }
    .card-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Input Field */
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #0B101B;
      border: 1.5px solid #233149;
      border-radius: 14px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      overflow: hidden;
    }
    .input-wrapper:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }
    .country-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: #141D2E;
      border-left: 1px solid #233149;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFF;
      user-select: none;
      transition: background 0.15s ease;
    }
    [dir="ltr"] .country-trigger {
      border-left: none;
      border-right: 1px solid #233149;
    }
    .country-trigger:hover {
      background: #1A263B;
    }
    .phone-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #FFF;
      font-size: 1.15rem;
      font-weight: 600;
      padding: 12px 14px;
      direction: ltr;
      text-align: left;
      font-family: inherit;
    }
    .input-tools {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px;
    }
    .btn-tool {
      background: #1A2436;
      border: 1px solid #283750;
      color: #94A3B8;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
      font-family: inherit;
    }
    .btn-tool:hover {
      background: #24324A;
      color: #FFF;
      border-color: #3D4E6B;
    }

    /* Formatted preview */
    .phone-preview {
      font-size: 0.8rem;
      color: var(--accent);
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      direction: ltr;
      justify-content: flex-end;
      font-weight: 600;
      min-height: 18px;
    }

    /* Message textarea */
    .textarea-wrapper {
      background: #0B101B;
      border: 1.5px solid #233149;
      border-radius: 14px;
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .textarea-wrapper:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }
    .msg-textarea {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #FFF;
      font-size: 0.95rem;
      padding: 12px 14px;
      font-family: inherit;
      resize: vertical;
      min-height: 70px;
      line-height: 1.5;
    }
    .msg-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px;
      background: #0E1524;
      border-top: 1px solid #1B263B;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* Quick Message Chip */
    .quick-text-section {
      margin-top: 8px;
    }
    .quick-chip {
      background: #141E30;
      border: 1px dashed #2A3C59;
      color: #CBD5E1;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      font-family: inherit;
      width: 100%;
      text-align: right;
    }
    [dir="ltr"] .quick-chip {
      text-align: left;
    }
    .quick-chip:hover {
      background: #1B2942;
      border-color: var(--accent);
      color: #FFF;
      border-style: solid;
    }

    /* Action Buttons Grid */
    .actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 6px;
    }
    @media (max-width: 420px) {
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
    .btn-action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px 16px;
      border-radius: 16px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFF;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.1s ease, filter 0.15s ease, box-shadow 0.15s ease;
      user-select: none;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }
    .btn-action:active {
      transform: scale(0.97);
    }
    .btn-action svg {
      width: 22px;
      height: 22px;
      shrink-0: 0;
    }
    .btn-whatsapp {
      background: linear-gradient(135deg, #25D366, #128C7E);
    }
    .btn-whatsapp:hover {
      filter: brightness(1.08);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
    }
    .btn-biz {
      background: linear-gradient(135deg, #008069, #075E54);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-biz:hover {
      filter: brightness(1.1);
      box-shadow: 0 6px 20px rgba(0, 128, 105, 0.4);
    }
    .btn-telegram {
      background: linear-gradient(135deg, #0088CC, #006699);
    }
    .btn-telegram:hover {
      filter: brightness(1.08);
      box-shadow: 0 6px 20px rgba(0, 136, 204, 0.35);
    }
    .btn-sms {
      background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    }
    .btn-sms:hover {
      filter: brightness(1.08);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
    }
    .btn-call {
      background: linear-gradient(135deg, #10B981, #047857);
    }
    .btn-call:hover {
      filter: brightness(1.08);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
    }
    .btn-secondary {
      background: #182235;
      border: 1px solid #283750;
      color: #E2E8F0;
    }
    .btn-secondary:hover {
      background: #202D45;
      border-color: #3D4E6B;
      color: #FFF;
    }

    /* Modals & Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(11, 15, 23, 0.85);
      backdrop-filter: blur(6px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-backdrop.active {
      display: flex;
    }
    .modal {
      background: #121927;
      border: 1px solid #1E293B;
      border-radius: 24px;
      max-width: 480px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 22px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
      position: relative;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #FFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .modal-close {
      background: #1B2436;
      border: none;
      color: #94A3B8;
      border-radius: 10px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .modal-close:hover {
      color: #FFF;
      background: #25324A;
    }

    /* Country List in Modal */
    .search-input {
      width: 100%;
      background: #0B101B;
      border: 1px solid #233149;
      color: #FFF;
      padding: 10px 14px;
      border-radius: 12px;
      margin-bottom: 12px;
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .country-list {
      max-height: 320px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .country-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: #141E30;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .country-item:hover {
      background: #1D2A42;
    }
    .country-item.selected {
      border: 1px solid var(--accent);
      background: #16293D;
    }

    /* History List */
    .history-list {
      max-height: 360px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #141E30;
      border: 1px solid #1E2B42;
      padding: 10px 14px;
      border-radius: 14px;
      gap: 10px;
    }
    .history-info {
      flex: 1;
      cursor: pointer;
    }
    .history-phone {
      font-weight: 700;
      color: #FFF;
      direction: ltr;
      text-align: right;
      font-size: 0.95rem;
    }
    [dir="ltr"] .history-phone {
      text-align: left;
    }
    .history-meta {
      font-size: 0.75rem;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #10B981;
      color: #062419;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 10px 20px;
      border-radius: 30px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.4);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* QR Code Display */
    .qr-container {
      background: #FFF;
      padding: 16px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px auto;
      width: 232px;
      height: 232px;
    }

    /* Offline Banner */
    .offline-banner {
      background: #F59E0B;
      color: #1F1300;
      font-weight: 700;
      font-size: 0.75rem;
      text-align: center;
      padding: 4px 10px;
      display: none;
    }
    .offline-banner.active {
      display: block;
    }

    /* Footer */
    footer {
      border-top: 1px solid #141D2B;
      padding: 14px 16px;
      text-align: center;
      font-size: 0.75rem;
      color: #64748B;
      background: #090D14;
    }
    .footer-inner {
      max-width: 540px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <!-- Offline Status Bar -->
  <div id="offline-bar" class="offline-banner">
    أنت تعمل في وضع عدم الاتصال (بدون إنترنت). يعمل التطبيق بكامل وظائفه محلياً!
  </div>

  <!-- Header -->
  <header>
    <div class="header-inner">
      <a href="#" class="brand">
        <span class="brand-dot"></span>
        <span>direct~chat</span>
      </a>
      <div class="nav-actions">
        <!-- Download HTML File Button -->
        <button id="btn-download-self" class="btn-icon" title="تنزيل نسخة من هذا الملف على جهازك">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>

        <!-- History Button -->
        <button id="btn-history" class="btn-icon" title="السجل">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span id="history-badge" class="btn-icon-badge" style="display:none;">0</span>
        </button>

        <!-- Settings Button -->
        <button id="btn-settings" class="btn-icon" title="الإعدادات">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        <!-- Help & Info Button -->
        <button id="btn-help" class="btn-icon" title="معلومات والتطوير">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="app-container">
    
    <!-- Phone Input Card -->
    <div class="card">
      <div class="card-title">
        <span id="txt-phone-label">رقم الهاتف</span>
        <span id="txt-default-hint" style="font-size:0.75rem; color:#64748B;">الرمز الدولي الافتراضي: <strong id="lbl-current-country" style="color:#10B981;">العراق (+964)</strong></span>
      </div>

      <div class="input-wrapper">
        <!-- Country Trigger -->
        <div id="country-trigger" class="country-trigger" title="اختر رمز الدولة">
          <span id="country-flag">🇮🇶</span>
          <span id="country-dial">+964</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Clean Phone Input with NO EXAMPLE placeholder as requested -->
        <input 
          type="tel" 
          id="phone-input" 
          class="phone-input" 
          placeholder="" 
          autocomplete="off"
          inputmode="tel"
        />

        <!-- Paste & Clear Buttons -->
        <div class="input-tools">
          <button id="btn-paste" class="btn-tool" type="button" title="لصق">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            <span id="txt-paste">لصق</span>
          </button>
          <button id="btn-clear-phone" class="btn-tool" type="button" style="display:none;" title="مسح">
            ✕
          </button>
        </div>
      </div>

      <!-- Human friendly number preview -->
      <div id="phone-preview" class="phone-preview"></div>
    </div>

    <!-- Message Card -->
    <div class="card">
      <div class="card-title">
        <span id="txt-msg-label">الرسالة (اختياري)</span>
        <button id="btn-clear-msg" class="btn-tool" type="button" style="display:none;">مسح الرسالة</button>
      </div>

      <div class="textarea-wrapper">
        <textarea 
          id="msg-input" 
          class="msg-textarea" 
          placeholder="اكتب رسالتك هنا (أو انقر على النص السريع أدناه)..."
        ></textarea>
        <div class="msg-footer">
          <span>نص الرسالة التلقائية عند بدء المحادثة</span>
          <span id="msg-char-count">0 حرف</span>
        </div>
      </div>

      <!-- Quick Text Chip as requested -->
      <div class="quick-text-section">
        <button id="btn-quick-text" class="quick-chip" type="button">
          <span>📦</span>
          <strong style="color:#10B981;">نص سريع:</strong>
          <span>السلام عليكم عدكم طلب توصيل يرجى ارسال الموقع</span>
        </button>
      </div>
    </div>

    <!-- Action Buttons Grid -->
    <div class="actions-grid">
      <!-- WhatsApp (Regular) -->
      <button id="btn-send-whatsapp" class="btn-action btn-whatsapp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.25 7.49C9.07 7.49 8.78 7.56 8.54 7.82C8.3 8.08 7.62 8.72 7.62 10.02C7.62 11.32 8.57 12.57 8.7 12.75C8.83 12.93 10.56 15.6 13.24 16.76C15.46 17.72 15.92 17.52 16.4 17.48C16.88 17.43 17.94 16.85 18.16 16.23C18.38 15.61 18.38 15.08 18.31 14.97C18.25 14.86 18.09 14.8 17.85 14.68C17.61 14.56 16.43 13.98 16.21 13.9C15.99 13.82 15.83 13.78 15.67 14.02C15.51 14.26 15.05 14.8 14.91 14.96C14.77 15.12 14.63 15.14 14.39 15.02C14.15 14.9 13.38 14.65 12.47 13.84C11.76 13.21 11.28 12.43 11.14 12.19C11 11.95 11.13 11.82 11.25 11.7C11.36 11.59 11.5 11.41 11.62 11.27C11.74 11.13 11.78 11.03 11.86 10.87C11.94 10.71 11.9 10.57 11.84 10.45C11.78 10.33 11.3 9.15 11.1 8.67C10.91 8.21 10.71 8.27 10.56 8.26C10.42 8.25 10.26 8.25 10.1 8.25C9.94 8.25 9.68 8.31 9.46 8.55C9.25 8.79 8.65 9.35 8.65 10.5C8.65 11.65 9.48 12.75 9.6 12.91C9.72 13.07 11.24 15.42 13.59 16.43C15.54 17.27 15.94 17.1 16.36 17.06C16.78 17.02 17.71 16.51 17.9 15.97C18.09 15.43 18.09 14.97 18.03 14.87C17.98 14.78 17.84 14.72 17.63 14.62L9.25 7.49Z"/>
        </svg>
        <span id="txt-btn-whatsapp">واتساب</span>
      </button>

      <!-- WhatsApp Business (Official B cutout icon) -->
      <button id="btn-send-biz" class="btn-action btn-biz">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.04 2C6.52 2 2.03 6.49 2.03 12.01c0 1.83.5 3.62 1.44 5.2L2 22l4.95-1.41c1.52.83 3.23 1.27 4.98 1.27 5.52 0 10.01-4.49 10.01-10.01C21.94 6.49 17.56 2 12.04 2zm-2.74 4.8h3.8c1.65 0 2.8.85 2.8 2.2 0 .9-.55 1.6-1.35 1.95 1.1.35 1.85 1.2 1.85 2.35 0 1.55-1.3 2.5-3.05 2.5H9.3V6.8zm2.1 1.7v2.3h1.5c.75 0 1.2-.4 1.2-1.15 0-.75-.45-1.15-1.2-1.15h-1.5zm0 3.8v2.5h1.75c.85 0 1.35-.45 1.35-1.25 0-.8-.5-1.25-1.35-1.25H11.4z"
          />
        </svg>
        <span id="txt-btn-biz">واتساب أعمال</span>
      </button>

      <!-- Telegram -->
      <button id="btn-send-telegram" class="btn-action btn-telegram">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
        <span id="txt-btn-telegram">تليجرام</span>
      </button>

      <!-- SMS -->
      <button id="btn-send-sms" class="btn-action btn-sms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span id="txt-btn-sms">رسالة قصيرة SMS</span>
      </button>

      <!-- Call Directly -->
      <button id="btn-send-call" class="btn-action btn-call">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span id="txt-btn-call">اتصال هاتفي</span>
      </button>

      <!-- Copy Link -->
      <button id="btn-copy-link" class="btn-action btn-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        <span id="txt-btn-copy">نسخ الرابط</span>
      </button>
    </div>

    <!-- QR Code Trigger Button -->
    <div style="margin-top: 10px;">
      <button id="btn-open-qr" class="btn-action btn-secondary" style="width:100%;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span id="txt-btn-qr">إنشاء ومسح رمز QR للمحادثة</span>
      </button>
    </div>

  </main>

  <!-- Minimal Footer -->
  <footer>
    <div class="footer-inner">
      <span style="font-weight:700; color:#94A3B8;">direct~chat</span>
      <span>مراسلة مباشرة بدون حفظ جهة الاتصال</span>
    </div>
  </footer>

  <!-- Toast Notification -->
  <div id="toast" class="toast">تم النسخ بنجاح!</div>

  <!-- Country Modal -->
  <div id="modal-country" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <span>🌍</span>
          <span>اختر الدولة والرمز الدولي</span>
        </div>
        <button class="modal-close" data-close="modal-country">✕</button>
      </div>
      <input type="text" id="country-search" class="search-input" placeholder="ابحث عن دولة أو رمز (+964، العراق، السعودية...)" />
      <div id="country-list-container" class="country-list"></div>
    </div>
  </div>

  <!-- History Modal / Drawer -->
  <div id="modal-history" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <span>🕒</span>
          <span id="txt-history-title">سجل الأرقام السابقة</span>
        </div>
        <button class="modal-close" data-close="modal-history">✕</button>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:0.8rem; color:#94A3B8;">الأرقام تحفظ محلياً على جهازك</span>
        <button id="btn-clear-history" class="btn-tool" style="color:#EF4444;">مسح السجل بالكامل</button>
      </div>
      <div id="history-items-container" class="history-list"></div>
    </div>
  </div>

  <!-- Settings Modal -->
  <div id="modal-settings" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <span>⚙️</span>
          <span>الإعدادات</span>
        </div>
        <button class="modal-close" data-close="modal-settings">✕</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Default Country Setting -->
        <div style="background:#141E30; padding:14px; border-radius:16px;">
          <h4 style="font-size:0.9rem; font-weight:700; color:#FFF; margin-bottom:4px;">الدولة الافتراضية</h4>
          <p style="font-size:0.75rem; color:#94A3B8; margin-bottom:10px;">يتم تطبيق هذا الرمز تلقائياً عند كتابة الرقم دون الحاجة لكتابة المفتاح الدولي كل مرة.</p>
          <button id="btn-settings-country-change" class="btn-action btn-secondary" style="width:100%; font-size:0.85rem; padding:10px;">
            <span id="lbl-settings-country">🇮🇶 العراق (+964)</span>
            <span>- تغيير</span>
          </button>
        </div>

        <!-- Language Setting -->
        <div style="background:#141E30; padding:14px; border-radius:16px;">
          <h4 style="font-size:0.9rem; font-weight:700; color:#FFF; margin-bottom:8px;">لغة التطبيق</h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button id="btn-lang-ar" class="btn-action btn-secondary" style="padding:10px; font-size:0.85rem;">العربية (RTL)</button>
            <button id="btn-lang-en" class="btn-action btn-secondary" style="padding:10px; font-size:0.85rem;">English (LTR)</button>
          </div>
        </div>

        <!-- Download Standalone HTML Button -->
        <div style="background:#141E30; padding:14px; border-radius:16px;">
          <h4 style="font-size:0.9rem; font-weight:700; color:#FFF; margin-bottom:4px;">تنزيل كملف HTML مستقل</h4>
          <p style="font-size:0.75rem; color:#94A3B8; margin-bottom:10px;">احفظ نسخة من هذا التطبيق كملف HTML واحد على هاتفك أو حاسوبك يعمل بدون إنترنت.</p>
          <button id="btn-settings-download" class="btn-action btn-call" style="width:100%; font-size:0.85rem; padding:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>تنزيل الملف (direct-chat.html)</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Help & Developer Modal -->
  <div id="modal-help" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <span>ℹ️</span>
          <span>حول تطبيق direct~chat</span>
        </div>
        <button class="modal-close" data-close="modal-help">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px; font-size:0.85rem; color:#CBD5E1;">
        <div style="background:#0E1524; padding:14px; border-radius:16px; border:1px solid #1E293B;">
          <h4 style="color:#FFF; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span style="color:#10B981;">⚡</span>
            <span>ما هو direct~chat؟</span>
          </h4>
          <p style="line-height:1.6; font-size:0.8rem; color:#94A3B8;">
            أداة مصممة لفتح المحادثات في واتساب، واتساب أعمال، تليجرام، أو إرسال SMS فوراً لأي رقم في العالم دون الحاجة لحفظه في جهات اتصال هاتفك أولاً.
          </p>
        </div>

        <!-- Key Features List -->
        <div style="background:#0E1524; padding:14px; border-radius:16px; border:1px solid #1E293B;">
          <h4 style="color:#FFF; font-weight:700; margin-bottom:8px;">أبرز الخصائص:</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:6px; font-size:0.8rem;">
            <li style="display:flex; align-items:center; gap:6px;"><span style="color:#10B981;">✓</span> <span>فصل كامل بين واتساب العادي وواتساب أعمال (لا يفتح العادي بالخطأ).</span></li>
            <li style="display:flex; align-items:center; gap:6px;"><span style="color:#10B981;">✓</span> <span>نص سريع بضغطة واحدة لطلب التوصيل والموقع الجغرافي.</span></li>
            <li style="display:flex; align-items:center; gap:6px;"><span style="color:#10B981;">✓</span> <span>توليد وقراءة رمز الاستجابة السريعة (QR Code) دون إنترنت.</span></li>
            <li style="display:flex; align-items:center; gap:6px;"><span style="color:#10B981;">✓</span> <span>سجل محلي مشفر على متصفحك للأرقام السابقة لسهولة إعادة المراسلة.</span></li>
          </ul>
        </div>

        <!-- Developer GitHub Link as requested -->
        <div style="background:linear-gradient(135deg, #0E1524, #141E33); padding:14px; border-radius:16px; border:1px solid rgba(16, 185, 129, 0.3);">
          <h4 style="color:#10B981; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>المطور وحساب GitHub</span>
          </h4>
          <p style="font-size:0.75rem; color:#94A3B8; margin-bottom:10px;">يمكنك متابعة وتصفح المشاريع مفتوحة المصدر عبر الرابط الرسمي:</p>
          <a href="https://github.com/admin-art1" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; justify-content:space-between; background:#0B101B; padding:10px 14px; border-radius:12px; border:1px solid #283750; color:#FFF; text-decoration:none;">
            <span style="font-family:monospace; font-weight:700;">github.com/admin-art1</span>
            <span style="color:#10B981; font-weight:700;">زيارة ↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- QR Code Modal -->
  <div id="modal-qr" class="modal-backdrop">
    <div class="modal" style="text-align:center;">
      <div class="modal-header">
        <div class="modal-title">
          <span>📱</span>
          <span>رمز الاستجابة السريعة (QR)</span>
        </div>
        <button class="modal-close" data-close="modal-qr">✕</button>
      </div>

      <p style="font-size:0.8rem; color:#94A3B8; margin-bottom:8px;">امسح الرمز بكاميرا أي هاتف لفتح المحادثة مباشرة:</p>
      
      <div class="qr-container">
        <canvas id="qr-canvas"></canvas>
      </div>

      <div style="font-family:monospace; font-size:1rem; font-weight:700; color:#10B981; direction:ltr; margin-bottom:12px;" id="qr-phone-display"></div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <button id="btn-download-qr" class="btn-action btn-call" style="font-size:0.85rem; padding:10px;">
          <span>حفظ الصورة 📥</span>
        </button>
        <button id="btn-copy-qr-link" class="btn-action btn-secondary" style="font-size:0.85rem; padding:10px;">
          <span>نسخ الرابط 📋</span>
        </button>
      </div>
    </div>
  </div>

  <!-- EMBEDDED QR CODE ENGINE (Zero external dependencies) -->
  <script>
    ${qrcodeBundle}
  </script>

  <!-- APPLICATION LOGIC (Clean Vanilla JS, Complete Feature Set) -->
  <script>
    // --- 1. COUNTRIES DATABASE ---
    const COUNTRIES = [
      { code: 'IQ', name: 'Iraq', nameAr: 'العراق', dialCode: '+964', flag: '🇮🇶' },
      { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', dialCode: '+966', flag: '🇸🇦' },
      { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات', dialCode: '+971', flag: '🇦🇪' },
      { code: 'EG', name: 'Egypt', nameAr: 'مصر', dialCode: '+20', flag: '🇪🇬' },
      { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', dialCode: '+965', flag: '🇰🇼' },
      { code: 'QA', name: 'Qatar', nameAr: 'قطر', dialCode: '+974', flag: '🇶🇦' },
      { code: 'OM', name: 'Oman', nameAr: 'عُمان', dialCode: '+968', flag: '🇴🇲' },
      { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', dialCode: '+973', flag: '🇧🇭' },
      { code: 'JO', name: 'Jordan', nameAr: 'الأردن', dialCode: '+962', flag: '🇯🇴' },
      { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', dialCode: '+961', flag: '🇱🇧' },
      { code: 'SY', name: 'Syria', nameAr: 'سوريا', dialCode: '+963', flag: '🇸🇾' },
      { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', dialCode: '+970', flag: '🇵🇸' },
      { code: 'YE', name: 'Yemen', nameAr: 'اليمن', dialCode: '+967', flag: '🇾🇪' },
      { code: 'TR', name: 'Turkey', nameAr: 'تركيا', dialCode: '+90', flag: '🇹🇷' },
      { code: 'US', name: 'United States', nameAr: 'أمريكا', dialCode: '+1', flag: '🇺🇸' },
      { code: 'GB', name: 'United Kingdom', nameAr: 'بريطانيا', dialCode: '+44', flag: '🇬🇧' },
      { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', dialCode: '+49', flag: '🇩🇪' },
      { code: 'FR', name: 'France', nameAr: 'فرنسا', dialCode: '+33', flag: '🇫🇷' },
      { code: 'SE', name: 'Sweden', nameAr: 'السويد', dialCode: '+46', flag: '🇸🇪' },
      { code: 'NL', name: 'Netherlands', nameAr: 'هولندا', dialCode: '+31', flag: '🇳🇱' },
      { code: 'CA', name: 'Canada', nameAr: 'كندا', dialCode: '+1', flag: '🇨🇦' },
      { code: 'AU', name: 'Australia', nameAr: 'أستراليا', dialCode: '+61', flag: '🇦🇺' },
      { code: 'IN', name: 'India', nameAr: 'الهند', dialCode: '+91', flag: '🇮🇳' },
      { code: 'PK', name: 'Pakistan', nameAr: 'باكستان', dialCode: '+92', flag: '🇵🇰' },
      { code: 'MA', name: 'Morocco', nameAr: 'المغرب', dialCode: '+212', flag: '🇲🇦' },
      { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', dialCode: '+213', flag: '🇩🇿' },
      { code: 'TN', name: 'Tunisia', nameAr: 'تونس', dialCode: '+216', flag: '🇹🇳' },
      { code: 'LY', name: 'Libya', nameAr: 'ليبيا', dialCode: '+218', flag: '🇱🇾' },
      { code: 'SD', name: 'Sudan', nameAr: 'السودان', dialCode: '+249', flag: '🇸🇩' },
      { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا', dialCode: '+60', flag: '🇲🇾' },
      { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا', dialCode: '+62', flag: '🇮🇩' },
      { code: 'ES', name: 'Spain', nameAr: 'إسبانيا', dialCode: '+34', flag: '🇪🇸' },
      { code: 'IT', name: 'Italy', nameAr: 'إيطاليا', dialCode: '+39', flag: '🇮🇹' },
      { code: 'RU', name: 'Russia', nameAr: 'روسيا', dialCode: '+7', flag: '🇷🇺' },
      { code: 'BR', name: 'Brazil', nameAr: 'البرازيل', dialCode: '+55', flag: '🇧🇷' }
    ];

    // --- 2. STATE MANAGEMENT ---
    let currentCountry = COUNTRIES[0]; // Iraq default
    let currentLang = 'ar';
    let history = [];

    // Load initial state from LocalStorage
    try {
      const savedCountryCode = localStorage.getItem('direct_chat_country_code');
      if (savedCountryCode) {
        const found = COUNTRIES.find(c => c.code === savedCountryCode);
        if (found) currentCountry = found;
      }
      const savedLang = localStorage.getItem('direct_chat_lang');
      if (savedLang === 'en' || savedLang === 'ar') {
        currentLang = savedLang;
      }
      const savedHistory = localStorage.getItem('direct_chat_history');
      if (savedHistory) {
        history = JSON.parse(savedHistory);
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }

    // --- 3. DOM ELEMENTS ---
    const phoneInput = document.getElementById('phone-input');
    const msgInput = document.getElementById('msg-input');
    const phonePreview = document.getElementById('phone-preview');
    const btnPaste = document.getElementById('btn-paste');
    const btnClearPhone = document.getElementById('btn-clear-phone');
    const btnClearMsg = document.getElementById('btn-clear-msg');
    const btnQuickText = document.getElementById('btn-quick-text');
    const msgCharCount = document.getElementById('msg-char-count');
    const countryTrigger = document.getElementById('country-trigger');
    const countryFlag = document.getElementById('country-flag');
    const countryDial = document.getElementById('country-dial');
    const lblCurrentCountry = document.getElementById('lbl-current-country');
    const lblSettingsCountry = document.getElementById('lbl-settings-country');
    const historyBadge = document.getElementById('history-badge');
    const toast = document.getElementById('toast');
    const offlineBar = document.getElementById('offline-bar');

    // --- 4. PHONE UTILITIES ---
    function cleanPhoneNumber(raw, dialCode) {
      if (!raw) return '';
      let str = raw.trim();
      if (str.startsWith('00')) str = '+' + str.slice(2);
      if (str.startsWith('+')) {
        return str.replace(/\\D/g, '');
      }
      let digits = str.replace(/\\D/g, '');
      if (!digits) return '';
      const dialDigits = dialCode.replace(/\\D/g, '');
      if (digits.startsWith(dialDigits) && digits.length > dialDigits.length + 5) {
        return digits;
      }
      if (digits.startsWith('0')) {
        digits = digits.replace(/^0+/, '');
      }
      return dialDigits + digits;
    }

    function formatDisplayPhone(cleaned) {
      if (!cleaned) return '';
      if (cleaned.length < 8) return '+' + cleaned;
      return '+' + cleaned.replace(/(\\d{3})(\\d{3})(\\d{4})$/, '$1 $2 $3');
    }

    function isAndroid() {
      return /android/i.test(navigator.userAgent || '');
    }

    function isIOS() {
      return /iphone|ipad|ipod/i.test(navigator.userAgent || '');
    }

    function getCleanedPhone() {
      return cleanPhoneNumber(phoneInput.value, currentCountry.dialCode);
    }

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    // --- 5. RENDER & UPDATE UI ---
    function updateCountryUI() {
      countryFlag.textContent = currentCountry.flag;
      countryDial.textContent = currentCountry.dialCode;
      lblCurrentCountry.textContent = currentCountry.nameAr + ' (' + currentCountry.dialCode + ')';
      lblSettingsCountry.textContent = currentCountry.flag + ' ' + currentCountry.nameAr + ' (' + currentCountry.dialCode + ')';
      updatePhonePreview();
    }

    function updatePhonePreview() {
      const raw = phoneInput.value.trim();
      btnClearPhone.style.display = raw ? 'inline-flex' : 'none';
      if (!raw) {
        phonePreview.textContent = '';
        return;
      }
      const cleaned = getCleanedPhone();
      if (cleaned.length >= 7) {
        phonePreview.innerHTML = '<span>جاهز للإرسال:</span> <strong>+' + cleaned + '</strong>';
      } else {
        phonePreview.innerHTML = '<span style="color:#F59E0B;">رقم الهاتف غير مكتمل</span>';
      }
    }

    function updateMsgUI() {
      const text = msgInput.value;
      btnClearMsg.style.display = text ? 'inline-flex' : 'none';
      msgCharCount.textContent = text.length + ' حرف';
    }

    function updateHistoryBadge() {
      if (history.length > 0) {
        historyBadge.textContent = history.length > 99 ? '99+' : history.length;
        historyBadge.style.display = 'flex';
      } else {
        historyBadge.style.display = 'none';
      }
    }

    function saveHistory(phone, platformName) {
      const item = {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        phone: phone,
        platformName: platformName,
        timestamp: Date.now(),
        message: msgInput.value.trim(),
        isStarred: false
      };
      history = [item, ...history.filter(h => h.phone !== phone)].slice(0, 50);
      try {
        localStorage.setItem('direct_chat_history', JSON.stringify(history));
      } catch (e) {}
      updateHistoryBadge();
      renderHistoryList();
    }

    function renderHistoryList() {
      const container = document.getElementById('history-items-container');
      if (history.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:24px; color:#64748B;">لا توجد أرقام سابقة في السجل</div>';
        return;
      }
      container.innerHTML = history.map(item => {
        const dateStr = new Date(item.timestamp).toLocaleDateString('ar', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return \`
          <div class="history-item">
            <div class="history-info" onclick="loadFromHistory('\${item.phone}', '\${encodeURIComponent(item.message || '')}')">
              <div class="history-phone">+\${item.phone}</div>
              <div class="history-meta">
                <span>\${item.platformName}</span>
                <span>•</span>
                <span>\${dateStr}</span>
                \${item.message ? '<span>•</span> <span style="max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + item.message + '</span>' : ''}
              </div>
            </div>
            <button onclick="deleteHistoryItem('\${item.id}')" style="background:transparent; border:none; color:#64748B; cursor:pointer; padding:6px;">✕</button>
          </div>
        \`;
      }).join('');
    }

    window.loadFromHistory = function(phone, encMsg) {
      phoneInput.value = phone;
      if (encMsg) {
        try {
          msgInput.value = decodeURIComponent(encMsg);
        } catch (e) {}
      }
      updatePhonePreview();
      updateMsgUI();
      closeModal('modal-history');
      showToast('تم تحميل الرقم من السجل');
    };

    window.deleteHistoryItem = function(id) {
      history = history.filter(h => h.id !== id);
      try {
        localStorage.setItem('direct_chat_history', JSON.stringify(history));
      } catch (e) {}
      updateHistoryBadge();
      renderHistoryList();
    };

    // --- 6. EVENT LISTENERS ---
    phoneInput.addEventListener('input', updatePhonePreview);
    msgInput.addEventListener('input', updateMsgUI);

    btnClearPhone.addEventListener('click', () => {
      phoneInput.value = '';
      updatePhonePreview();
      phoneInput.focus();
    });

    btnClearMsg.addEventListener('click', () => {
      msgInput.value = '';
      updateMsgUI();
      msgInput.focus();
    });

    btnPaste.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            phoneInput.value = text;
            updatePhonePreview();
            showToast('تم اللصق بنجاح');
            return;
          }
        }
      } catch (e) {}
      phoneInput.focus();
      showToast('يرجى لصق الرقم داخل الحقل');
    });

    btnQuickText.addEventListener('click', () => {
      const template = 'السلام عليكم عدكم طلب توصيل يرجى ارسال الموقع';
      if (msgInput.value.includes(template)) {
        showToast('النص مضاف مسبقاً');
      } else {
        msgInput.value = msgInput.value ? (msgInput.value + ' ' + template) : template;
        updateMsgUI();
        showToast('تمت إضافة نص طلب التوصيل');
      }
    });

    // --- 7. ACTION BUTTON HANDLERS ---
    function validatePhoneBeforeAction() {
      const cleaned = getCleanedPhone();
      if (!cleaned || cleaned.length < 7) {
        showToast('يرجى إدخال رقم هاتف صالح أولاً!');
        phoneInput.focus();
        return null;
      }
      return cleaned;
    }

    // WhatsApp Regular
    document.getElementById('btn-send-whatsapp').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const textParam = text ? '?text=' + encodeURIComponent(text) : '';
      saveHistory(phone, 'واتساب');
      window.location.href = 'https://wa.me/' + phone + textParam;
    });

    // WhatsApp Business
    document.getElementById('btn-send-biz').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const textParam = text ? '&text=' + encodeURIComponent(text) : '';
      const fallbackUrl = encodeURIComponent('https://wa.me/' + phone + (text ? '?text=' + encodeURIComponent(text) : ''));
      saveHistory(phone, 'واتساب أعمال');

      if (isAndroid()) {
        // Direct intent targeting official WhatsApp Business package (com.whatsapp.w4b)
        window.location.href = 'intent://send?phone=' + phone + textParam + '#Intent;package=com.whatsapp.w4b;scheme=whatsapp;S.browser_fallback_url=' + fallbackUrl + ';end';
      } else if (isIOS()) {
        window.location.href = 'whatsapp-business://send?phone=' + phone + textParam;
      } else {
        window.location.href = 'https://wa.me/' + phone + (text ? '?text=' + encodeURIComponent(text) : '');
      }
    });

    // Telegram
    document.getElementById('btn-send-telegram').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const textParam = text ? '?text=' + encodeURIComponent(text) : '';
      saveHistory(phone, 'تليجرام');
      window.location.href = 'https://t.me/+' + phone + textParam;
    });

    // SMS
    document.getElementById('btn-send-sms').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const bodyParam = text ? '?body=' + encodeURIComponent(text) : '';
      saveHistory(phone, 'SMS');
      window.location.href = 'sms:+' + phone + bodyParam;
    });

    // Call Directly
    document.getElementById('btn-send-call').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      saveHistory(phone, 'اتصال');
      window.location.href = 'tel:+' + phone;
    });

    // Copy Link
    document.getElementById('btn-copy-link').addEventListener('click', async () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const url = text ? 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text) : 'https://wa.me/' + phone;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
          showToast('تم نسخ الرابط المباشر إلى الحافظة!');
          return;
        }
      } catch (e) {}
      showToast('الرابط: ' + url);
    });

    // QR Code Generation
    document.getElementById('btn-open-qr').addEventListener('click', () => {
      const phone = validatePhoneBeforeAction();
      if (!phone) return;
      const text = msgInput.value.trim();
      const url = text ? 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text) : 'https://wa.me/' + phone;
      
      document.getElementById('qr-phone-display').textContent = '+' + phone;
      const canvas = document.getElementById('qr-canvas');
      
      QRCode.toCanvas(canvas, url, {
        width: 200,
        margin: 1,
        color: {
          dark: '#0B0F17',
          light: '#FFFFFF'
        }
      }, function (error) {
        if (error) console.error(error);
      });

      openModal('modal-qr');
    });

    // Download QR Image
    document.getElementById('btn-download-qr').addEventListener('click', () => {
      const canvas = document.getElementById('qr-canvas');
      const image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = image;
      a.download = 'direct-chat-qr-' + getCleanedPhone() + '.png';
      a.click();
      showToast('تم حفظ صورة رمز QR');
    });

    // Copy QR Link
    document.getElementById('btn-copy-qr-link').addEventListener('click', async () => {
      const phone = getCleanedPhone();
      const text = msgInput.value.trim();
      const url = text ? 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text) : 'https://wa.me/' + phone;
      try {
        await navigator.clipboard.writeText(url);
        showToast('تم نسخ الرابط بنجاح!');
      } catch (e) {
        showToast('تم النسخ');
      }
    });

    // --- 8. MODAL CONTROLLERS ---
    function openModal(id) {
      document.getElementById(id).classList.add('active');
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }

    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.getAttribute('data-close'));
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('active');
      });
    });

    // Open Country Modal
    countryTrigger.addEventListener('click', () => {
      renderCountryList('');
      openModal('modal-country');
      setTimeout(() => document.getElementById('country-search').focus(), 100);
    });

    document.getElementById('btn-settings-country-change').addEventListener('click', () => {
      closeModal('modal-settings');
      renderCountryList('');
      openModal('modal-country');
    });

    // Search Countries
    const countrySearch = document.getElementById('country-search');
    countrySearch.addEventListener('input', (e) => {
      renderCountryList(e.target.value.trim().toLowerCase());
    });

    function renderCountryList(query) {
      const container = document.getElementById('country-list-container');
      const filtered = COUNTRIES.filter(c => {
        if (!query) return true;
        return c.nameAr.toLowerCase().includes(query) ||
               c.name.toLowerCase().includes(query) ||
               c.dialCode.includes(query) ||
               c.code.toLowerCase().includes(query);
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:16px; color:#64748B;">لا توجد نتائج مطابقة</div>';
        return;
      }

      container.innerHTML = filtered.map(c => \`
        <div class="country-item \${c.code === currentCountry.code ? 'selected' : ''}" onclick="selectCountry('\${c.code}')">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.2rem;">\${c.flag}</span>
            <span style="font-weight:600; color:#FFF;">\${c.nameAr}</span>
            <span style="font-size:0.8rem; color:#94A3B8;">(\${c.name})</span>
          </div>
          <span style="direction:ltr; font-weight:700; color:#10B981;">\${c.dialCode}</span>
        </div>
      \`).join('');
    }

    window.selectCountry = function(code) {
      const found = COUNTRIES.find(c => c.code === code);
      if (found) {
        currentCountry = found;
        try {
          localStorage.setItem('direct_chat_country_code', found.code);
        } catch (e) {}
        updateCountryUI();
        closeModal('modal-country');
        showToast('تم تعيين الدولة: ' + found.nameAr);
      }
    };

    // Open History Modal
    document.getElementById('btn-history').addEventListener('click', () => {
      renderHistoryList();
      openModal('modal-history');
    });

    document.getElementById('btn-clear-history').addEventListener('click', () => {
      if (confirm('هل أنت متأكد من مسح جميع الأرقام من السجل؟')) {
        history = [];
        try {
          localStorage.removeItem('direct_chat_history');
        } catch (e) {}
        updateHistoryBadge();
        renderHistoryList();
        showToast('تم مسح السجل');
      }
    });

    // Open Settings Modal
    document.getElementById('btn-settings').addEventListener('click', () => {
      openModal('modal-settings');
    });

    // Open Help Modal
    document.getElementById('btn-help').addEventListener('click', () => {
      openModal('modal-help');
    });

    // Language Toggles
    document.getElementById('btn-lang-ar').addEventListener('click', () => {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
      try { localStorage.setItem('direct_chat_lang', 'ar'); } catch (e) {}
      showToast('تم ضبط اللغة: العربية');
      closeModal('modal-settings');
    });

    document.getElementById('btn-lang-en').addEventListener('click', () => {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      try { localStorage.setItem('direct_chat_lang', 'en'); } catch (e) {}
      showToast('Language set: English');
      closeModal('modal-settings');
    });

    // --- 9. DOWNLOAD STANDALONE HTML FILE (Client-side Self-Packaging) ---
    function triggerDownloadSelf() {
      // Get the complete source of this document
      const docHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
      const blob = new Blob([docHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'direct-chat.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('جارٍ تحميل ملف direct-chat.html المستقل...');
    }

    document.getElementById('btn-download-self').addEventListener('click', triggerDownloadSelf);
    document.getElementById('btn-settings-download').addEventListener('click', triggerDownloadSelf);

    // --- 10. NETWORK STATUS ---
    function checkNetwork() {
      if (!navigator.onLine) {
        offlineBar.classList.add('active');
      } else {
        offlineBar.classList.remove('active');
      }
    }
    window.addEventListener('online', checkNetwork);
    window.addEventListener('offline', checkNetwork);
    checkNetwork();

    // Init
    updateCountryUI();
    updateHistoryBadge();
  </script>
</body>
</html>`;

fs.writeFileSync('public/direct-chat.html', htmlContent);
fs.writeFileSync('direct-chat.html', htmlContent);
console.log('Successfully created public/direct-chat.html and direct-chat.html');
console.log('Size in KB:', Math.round(htmlContent.length / 1024));
