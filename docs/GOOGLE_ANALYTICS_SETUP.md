# 📊 Google Analytics Setup Guide

## 🚀 Quick Setup

### 1. Dapatkan Google Analytics ID

1. Buka [Google Analytics](https://analytics.google.com/)
2. Buat akun baru atau pilih property yang sudah ada
3. Salin **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Setup Environment Variable

Buat file `.env.local` di root project:

```bash
# Copy dari .env.local.example
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
```

### 3. Deploy ke Production

Google Analytics hanya aktif di production mode. Untuk testing:

```bash
npm run build
npm start
```

## 📈 Event Tracking yang Tersedia

### 1. Contact Form Events
```typescript
// Automatic tracking (sudah disetup)
- Contact form submit (success)
- Contact form error
```

### 2. Portfolio Events
```typescript
import { useAnalytics } from '@/components/analytics/GoogleAnalytics';

const analytics = useAnalytics();

// Project view tracking
analytics.projectView('Project Name');

// Project link clicks
analytics.projectLinkClick('Project Name', 'demo'); // or 'github'
```

### 3. Blog Events
```typescript
// Blog post view
analytics.blogPostView('Post Title', 'Category');

// Blog post share
analytics.blogPostShare('Post Title', 'twitter'); // platform
```

### 4. Search Events
```typescript
// Site search
analytics.siteSearch('search term', 5); // results count
```

### 5. Engagement Events
```typescript
// Scroll depth tracking
analytics.scrollDepth(75); // percentage

// Time on page
analytics.timeOnPage(120, '/blog/post-slug'); // seconds, page

// Resume download
analytics.resumeDownload();

// Social media clicks
analytics.socialClick('linkedin', 'header'); // platform, location
```

## 🔧 Custom Event Tracking

Tambahkan event tracking ke komponen:

```typescript
import { useAnalytics } from '@/components/analytics/GoogleAnalytics';

const MyComponent = () => {
  const analytics = useAnalytics();
  
  const handleSpecialAction = () => {
    // Your action logic here
    
    // Track the event
    analytics.trackEvent('special_action', {
      event_category: 'user_interaction',
      event_label: 'special_button',
      value: 1,
    });
  };
  
  return (
    <button onClick={handleSpecialAction}>
      Special Action
    </button>
  );
};
```

## 📊 Performance Monitoring

### Core Web Vitals
Automatic tracking (sudah disetup):
- **CLS** (Cumulative Layout Shift)
- **INP** (Interaction to Next Paint)
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **TTFB** (Time to First Byte)

Data ini muncul di Google Analytics → Reports → Engagement → Events

### Error Tracking
```typescript
// JavaScript error tracking
analytics.jsError('Error message', '/current-page');

// Performance issues
analytics.performanceMetric('LCP', 2500, 'needs-improvement');
```

## 🎯 View Data di Google Analytics

### 1. Real-time Data
- Analytics → Reports → Realtime
- Lihat user aktif, page views, events

### 2. Event Reports
- Analytics → Reports → Engagement → Events
- Filter by event name: `contact_form_submit`, `project_view`, dll

### 3. Custom Reports
- Analytics → Explore → Create custom report
- Dimensi: Event name, Page path, Country
- Metrik: Event count, Users, Sessions

### 4. Core Web Vitals
- Analytics → Reports → Engagement → Events
- Filter by event name: `web_vitals`
- Lihat performance metrics

## 🛡️ Privacy & GDPR Compliance

Settings yang sudah dikonfigurasi:
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  anonymize_ip: true,                    // Anonymize IP addresses
  allow_google_signals: false,           // Disable Google Signals
  allow_ad_personalization_signals: false // Disable ad personalization
});
```

### Cookie Banner (Optional)
Untuk compliance penuh, tambahkan cookie consent:

```typescript
// Install package
npm install react-cookie-consent

// Usage
import CookieConsent from "react-cookie-consent";

<CookieConsent>
  This website uses cookies to enhance the user experience.
</CookieConsent>
```

## 🔍 Debugging

### Development Mode
```bash
# Lihat console logs
npm run dev

# Buka browser console, cari:
[Web Vitals] CLS: {...}
[Web Vitals] LCP: {...}
```

### Production Testing
```bash
# Build dan test locally
npm run build
npm start

# Check Google Analytics Realtime
# Aksi di website → lihat di Analytics Realtime
```

### Common Issues

1. **Events tidak muncul:**
   - Pastikan `NEXT_PUBLIC_GA_MEASUREMENT_ID` benar
   - Cek di browser console ada error?
   - Tunggu 10-15 menit untuk data muncul

2. **Development tidak track:**
   - Normal! Analytics hanya aktif di production
   - Gunakan `npm run build && npm start` untuk test

3. **Core Web Vitals tidak ada:**
   - Perlu beberapa hari untuk data accumulate
   - Pastikan site ada traffic

## 📱 Mobile App Tracking (Future)

Untuk mobile app dengan React Native:
```typescript
// Firebase Analytics
import analytics from '@react-native-firebase/analytics';

await analytics().logEvent('portfolio_view', {
  project_name: 'My Project',
  user_id: 'user123',
});
```

## 🚀 Advanced Features

### 1. Conversion Tracking
```typescript
// E-commerce or goal tracking
analytics.trackConversion('AW-CONVERSION_ID', 100);
```

### 2. User ID Tracking
```typescript
// For authenticated users
gtag('config', 'GA_MEASUREMENT_ID', {
  user_id: 'user_123'
});
```

### 3. Custom Dimensions
```typescript
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'user_type',
    'custom_parameter_2': 'subscription_level'
  }
});
```

---

## ✅ Checklist Setup

- [ ] Dapatkan GA Measurement ID
- [ ] Setup `.env.local`
- [ ] Test di production mode
- [ ] Verify events di GA Realtime
- [ ] Setup custom events sesuai kebutuhan
- [ ] Monitor Core Web Vitals
- [ ] Setup custom reports

Happy tracking! 📊✨