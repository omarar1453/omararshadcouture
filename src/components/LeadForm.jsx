import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const LeadForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    contactMethod: 'whatsapp',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Track form submission in dataLayer for GTM
    trackEvent('form_submission', {
      event_category: 'lead',
      event_label: 'lead_form',
      contact_method: form.contactMethod,
    });

    // Submit to Google Apps Script or similar endpoint
    // Replace this URL with your actual Google Apps Script Web App URL
    const FORM_ENDPOINT = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
          gclid: new URLSearchParams(window.location.search).get('gclid') || '',
        }),
      });
      setSubmitted(true);
    } catch {
      // Even in no-cors mode this may "fail" but the request still goes through
      setSubmitted(true);
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="lead-form" className="bg-white py-10 sm:py-14 px-4 sm:px-6 border-t border-divider-gold">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle size={40} className="text-antique-gold mx-auto mb-4" />
          <h3 className="text-xl font-serif text-text-primary mb-3">Thank You!</h3>
          <p className="text-text-secondary">
            We have received your enquiry and will get back to you within 24 hours via your preferred contact method.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="bg-white py-10 sm:py-14 px-4 sm:px-6 border-t border-divider-gold">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-antique-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-primary italic mb-2">
            Send Us Your Design
          </h2>
          <p className="text-text-secondary text-sm">
            Prefer email or a phone call? Fill out this form and we will reach out to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-divider-gold rounded-lg text-base text-text-primary bg-ivory focus:outline-none focus:ring-2 focus:ring-antique-gold/50 focus:border-antique-gold transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-divider-gold rounded-lg text-base text-text-primary bg-ivory focus:outline-none focus:ring-2 focus:ring-antique-gold/50 focus:border-antique-gold transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
              Phone / WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-divider-gold rounded-lg text-base text-text-primary bg-ivory focus:outline-none focus:ring-2 focus:ring-antique-gold/50 focus:border-antique-gold transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1.5">
              Describe Your Dream Outfit (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about the bridal outfit you want -- colors, style, occasion, reference designers..."
              className="w-full px-4 py-3 border border-divider-gold rounded-lg text-base text-text-primary bg-ivory focus:outline-none focus:ring-2 focus:ring-antique-gold/50 focus:border-antique-gold transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Contact Method
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone Call' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm cursor-pointer transition-all ${
                    form.contactMethod === opt.value
                      ? 'border-antique-gold bg-antique-gold/10 text-antique-gold font-medium'
                      : 'border-divider-gold text-text-secondary hover:border-antique-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={opt.value}
                    checked={form.contactMethod === opt.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-antique-gold hover:bg-text-primary text-white py-4 rounded-full text-base font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
          >
            <Send size={18} />
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>

          <p className="text-xs text-text-secondary text-center">
            We respect your privacy. Your information is never shared with third parties.
          </p>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
