// --- Tracking & Currency Utilities ---
// Extracted from LuxurySmartSite.jsx for shared use across components

export const WHATSAPP_NUMBER = '923007201800';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  { code: 'GBP', symbol: '£', rate: 0.75, label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', rate: 0.90, label: 'EUR (€)' },
  { code: 'PKR', symbol: 'Rs', rate: 280, label: 'PKR (Rs)' },
  { code: 'AED', symbol: 'AED', rate: 3.67, label: 'AED' },
  { code: 'CAD', symbol: 'C$', rate: 1.36, label: 'CAD (C$)' },
];

export const formatPrice = (usdPrice, currency) => {
  if (!usdPrice || !currency) return '';
  const val = Math.round(usdPrice * currency.rate);
  return `${currency.symbol}${val.toLocaleString()}`;
};

// Extract UTM/gclid params from URL
export const getTrackingInfo = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || 'direct',
    campaign: params.get('utm_campaign') || params.get('campaign') || '',
    gclid: params.get('gclid') || '',
    medium: params.get('utm_medium') || '',
    style: params.get('style') || '',
  };
};

// Detect currency from country code
export const getCurrencyForCountry = (countryCode) => {
  const map = {
    GB: 'GBP',
    PK: 'PKR',
    AE: 'AED',
    CA: 'CAD',
    DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
  };
  const code = map[countryCode] || 'USD';
  return CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
};

// Push WhatsApp click event to GTM dataLayer
export const trackWhatsAppClick = (eventLabel, extraData = {}) => {
  const tracking = getTrackingInfo();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    event_category: 'conversion',
    event_label: eventLabel,
    gclid: tracking.gclid || '',
    utm_source: tracking.source || 'direct',
    utm_campaign: tracking.campaign || '',
    ...extraData,
  });
};

// Open WhatsApp with pre-filled message + tracking
export const openWhatsApp = (message, eventLabel = 'general', extraData = {}) => {
  trackWhatsAppClick(eventLabel, extraData);

  const tracking = getTrackingInfo();
  let trackingRef = '';
  if (tracking.gclid) trackingRef = ` [G-Ad: ${tracking.gclid.substring(0, 8)}]`;
  else if (tracking.campaign) trackingRef = ` [Camp: ${tracking.campaign}]`;
  else trackingRef = ` [Ref: Website]`;

  const fullMessage = `${message}${trackingRef}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  window.open(url, '_blank');
};

// Track generic events to dataLayer
export const trackEvent = (eventName, data = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
};
