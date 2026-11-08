import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Eye,
  FileText,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { STORES } from '../data/stores';

export const ContactUs = () => {
  const { toast } = useNotification();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('Prescription Query / Power Verification');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Store city filter
  const [selectedCity, setSelectedCity] = useState('All');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicketId = `TLH-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: generatedTicketId,
        name,
        subject,
        email,
      });
      setIsSubmitting(false);
      toast.success(`Message sent! Reference ticket ${generatedTicketId} created.`);
      setName('');
      setEmail('');
      setPhone('');
      setOrderId('');
      setMessage('');
    }, 600);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
  };

  const cities = ['All', ...new Set(STORES.map((s) => s.city))];

  const filteredStores =
    selectedCity === 'All'
      ? STORES
      : STORES.filter((store) => store.city.toLowerCase() === selectedCity.toLowerCase());

  const contactFaqs = [
    {
      q: 'Can I purchase frames now and provide my eye prescription later?',
      a: 'Yes, absolutely. You can checkout with "Upload Later" or choose non-powered frames. After completing your order, our optical desk will contact you via WhatsApp and email to securely collect your prescription slip.'
    },
    {
      q: 'How long does lens manufacturing and doorstep delivery take?',
      a: 'Single-vision lenses are custom-edged and dispatched within 2–3 business days. Complex high-index, bifocal, and progressive lenses take 4–5 business days. Once dispatched, standard metro delivery takes 24–48 hours.'
    },
    {
      q: 'What is your 14-day trial & exchange guarantee?',
      a: 'If you experience any frame discomfort or lens power adaptation issues, we offer free reverse pickup and a 14-day hassle-free replacement or full refund to your original payment method.'
    },
    {
      q: 'How do I verify my pupillary distance (PD) or complex progressive power?',
      a: 'You can attach your doctor prescription slip or opt for our optical verification callback. Our optometrists will confirm your precise pupillary distance and axis measurements prior to custom lens cutting.'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        {/* Hero Section */}
        <div className="mt-4 mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E4232C] rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Dedicated Optical Support Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14232E] tracking-tight">
            How Can We Assist Your Vision?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have questions regarding frame sizes, digital lens coatings, submitting an optometrist slip, or tracking your dispatch? Our certified optical specialists respond within 2 hours.
          </p>
        </div>

        {/* 4 Quick Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Toll Free Phone */}
          <a
            href="tel:+9118002098890"
            className="p-5 bg-[#F5F6F7] hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#14232E]/30 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-100/60 text-[#E4232C] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Toll-Free Helpline
                </span>
                <span className="text-sm font-extrabold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                  +91 1800 209 8890
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Mon – Sun: 9:00 AM – 9:00 PM IST. Direct consultation with opticians.
              </p>
            </div>
            <div className="pt-3 text-[11px] font-bold text-[#E4232C] flex items-center gap-1">
              <span>Call now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* WhatsApp Desk */}
          <a
            href="https://wa.me/919820144520?text=Hi%20The%20Lens%20Hut%2C%20I%20have%20a%20query%20about%20my%20order%2Fprescription"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#F5F6F7] hover:bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp Support Desk
                </span>
                <span className="text-sm font-extrabold text-[#14232E] group-hover:text-emerald-600 transition-colors">
                  +91 98201 44520
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Fast prescription photo verification, frame recommendations & status.
              </p>
            </div>
            <div className="pt-3 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <span>Chat on WhatsApp</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Email Support */}
          <a
            href="mailto:care@thelenshut.com"
            className="p-5 bg-[#F5F6F7] hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#14232E]/30 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100/60 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Support
                </span>
                <span className="text-sm font-extrabold text-[#14232E] group-hover:text-[#E4232C] transition-colors break-all">
                  care@thelenshut.com
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Detailed queries, corporate bulk orders & optometry lab inquiries.
              </p>
            </div>
            <div className="pt-3 text-[11px] font-bold text-[#14232E] flex items-center gap-1">
              <span>Send email</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Online Optical Desk */}
          <div className="p-5 bg-[#14232E] text-white rounded-xl border border-[#14232E] shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-[#E4232C] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                  Optical Desk
                </span>
                <span className="text-sm font-extrabold text-white">
                  Prescription Support
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                100% digital verification. Consult our optometrists for progressive & high-power fittings.
              </p>
            </div>
            <a
              href="#contact-form"
              className="pt-3 text-[11px] font-bold text-[#E4232C] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Get in touch</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Main Grid: Contact Form + Help Sidebar */}
        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#14232E]">
                Send Us an Optical Support Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a query regarding your frame order, prescription slip, or returns? Leave a message and our specialists will contact you.
              </p>
            </div>

            {submittedTicket ? (
              <div className="p-8 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-700">
                    Inquiry Dispatched Successfully
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">
                    Thank you, {submittedTicket.name}!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your inquiry regarding <span className="font-semibold">{submittedTicket.subject}</span> has been logged under support ticket{' '}
                    <span className="font-mono font-bold text-[#14232E] bg-white px-2 py-0.5 rounded border border-emerald-300">
                      {submittedTicket.id}
                    </span>.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-100 text-xs text-slate-600 max-w-md mx-auto text-left space-y-2">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Clock size={14} className="text-emerald-600" />
                    <span>Expected Response Time</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A confirmation has been sent to <strong className="text-slate-700">{submittedTicket.email}</strong>. Our optometrist desk typically answers within 2 business hours.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-[#14232E] hover:bg-[#E4232C] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Full Name <span className="text-[#E4232C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Email Address <span className="text-[#E4232C]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@example.com"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Mobile / WhatsApp Number <span className="text-[#E4232C]">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98200 12345"
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-r-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Order ID <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. TLH-6842"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#14232E] block mb-1">
                    Subject / Query Type <span className="text-[#E4232C]">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E] bg-white cursor-pointer"
                  >
                    <option value="Prescription Query / Power Verification">Prescription Query / Power Verification</option>
                    <option value="Order Status & Dispatch Tracking">Order Status & Dispatch Tracking</option>
                    <option value="Lens Coating & Index Recommendation">Lens Coating & Index Recommendation (Blue Cut, Anti-Glare)</option>
                    <option value="14-Day Free Exchange & Return Request">14-Day Free Exchange & Return Request</option>
                    <option value="Book In-Store Eye Checkup">Book In-Store Eye Checkup</option>
                    <option value="Corporate / Bulk Eyewear Orders">Corporate / Bulk Eyewear Orders</option>
                    <option value="Other Assistance">Other Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#14232E] block mb-1">
                    Your Message <span className="text-[#E4232C]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, frame size requirement, or prescription details..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs text-[#14232E] focus:outline-none focus:ring-2 focus:ring-[#14232E]/10 focus:border-[#14232E]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 bg-[#E4232C] hover:bg-[#C81921] disabled:bg-slate-300 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}</span>
                  </button>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    <span>Your privacy and medical records are encrypted.</span>
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Support Capabilities & Direct Prescription Upload (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Prescription WhatsApp Assistant */}
            <div className="p-6 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <FileText size={18} className="text-emerald-600" />
                <span>Need Rapid Prescription Verification?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip typing! Take a clear photo of your doctor's slip or prescription card and send it to our senior optometrist desk on WhatsApp.
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/919820144520?text=Hi%20The%20Lens%20Hut%2C%20here%20is%20my%20prescription%20slip%20for%20verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md shadow-xs transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Send Prescription Slip</span>
                </a>
              </div>
            </div>

            {/* Service Commitments */}
            <div className="p-6 bg-[#F5F6F7] rounded-xl border border-slate-200/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#14232E] border-b border-slate-200 pb-2">
                Our Service Guarantee
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white rounded text-[#E4232C] shadow-2xs">
                    <Clock size={15} />
                  </div>
                  <div>
                    <strong className="text-[#14232E] block">2-Hour Rapid Response</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tickets received during 9:00 AM – 9:00 PM are evaluated by our optical desk within 120 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white rounded text-[#E4232C] shadow-2xs">
                    <Eye size={15} />
                  </div>
                  <div>
                    <strong className="text-[#14232E] block">99.8% Prescription Accuracy</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Computer-controlled lens edging calibrated against your exact pupillary distance (PD).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white rounded text-[#E4232C] shadow-2xs">
                    <RotateCcw size={15} />
                  </div>
                  <div>
                    <strong className="text-[#14232E] block">14-Day Free Exchange</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Free doorstep reverse pickup if your spectacles don't fit your face structure comfortably.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate / Lab Address */}
            <div className="p-6 bg-white rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14232E]">
                <MapPin size={15} className="text-[#E4232C]" />
                <span>Head Office & Central Lab</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Lens Hut Optical Labs Pvt Ltd<br />
                Plot 42, Linking Road, Khar-Bandra West,<br />
                Mumbai 400052, Maharashtra, India.
              </p>
              <div className="text-[11px] text-slate-500 pt-1 space-y-1">
                <div>CIN: U33201MH2021PTC368942</div>
                <div>GSTIN: 27AABCT8921K1ZN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Retail Experience Centers Section */}
        {filteredStores.length > 0 && (
          <div id="retail-stores" className="pt-8 mb-16 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
                  PHYSICAL LOCATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] mt-1">
                  Our Experience Stores & Eye Clinics
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Visit in person to try 500+ frames, get 3D face-shape analysis, and receive a computerized eye test.
                </p>
              </div>

              {/* City filter tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#14232E] text-white'
                        : 'bg-[#F5F6F7] text-slate-600 hover:text-[#14232E]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#14232E]/40 hover:shadow-sm transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-[#14232E]">
                        {store.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                        {store.city}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={15} className="text-[#E4232C] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{store.address}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock size={15} className="text-slate-400 shrink-0" />
                        <span>{store.timing}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone size={15} className="text-slate-400 shrink-0" />
                        <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="hover:text-[#E4232C] font-medium">
                          {store.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail size={15} className="text-slate-400 shrink-0" />
                        <a href={`mailto:${store.email}`} className="hover:text-[#E4232C]">
                          {store.email}
                        </a>
                      </div>
                    </div>

                    {store.optometristAvailable && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold">
                        <CheckCircle2 size={12} />
                        <span>Optometrist On-Duty & Free Eye Test</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14232E] hover:text-[#E4232C] transition-colors"
                    >
                      <span>Get Directions</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={`tel:${store.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-1 bg-[#F5F6F7] hover:bg-[#14232E] hover:text-white rounded text-xs font-semibold text-slate-700 transition-colors"
                    >
                      Call Store
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frequently Asked Inquiries Accordion */}
        <div className="pt-8 mb-16 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
              QUICK ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E]">
              Frequently Asked Support Questions
            </h2>
          </div>

          <div className="space-y-3">
            {contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E4232C]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F5F6F7]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
