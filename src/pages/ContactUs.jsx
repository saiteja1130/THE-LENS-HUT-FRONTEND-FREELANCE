import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle2, Send } from 'lucide-react';
export const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Prescription Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'Contact Us'
      }]} />

        {/* Hero */}
        <div className="mt-4 mb-12 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            WE ARE HERE TO HELP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            Contact Optical Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have questions about frame dimensions, lens coatings, or submitting an optometrist slip? Our optical specialists respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F5F6F7] rounded-xl border border-slate-200/80 p-6 space-y-6">
              <h2 className="text-base font-bold text-[#14232E] border-b border-slate-200 pb-3">
                Flagship Clinic & Corporate Office
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#E4232C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14232E] block">Bandra West Flagship</strong>
                    <p className="text-slate-500 leading-relaxed mt-0.5">
                      Plot 42, Linking Road, Khar-Bandra West, Mumbai 400052, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#E4232C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14232E] block">Toll-Free Customer Care</strong>
                    <p className="text-slate-500 mt-0.5">+91 1800 209 8890 (Mon–Sun, 9 AM – 9 PM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#E4232C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14232E] block">Optical Inquiries & Orders</strong>
                    <p className="text-slate-500 mt-0.5">care@thelenshut.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14232E] block">WhatsApp Optometrist Desk</strong>
                    <p className="text-slate-500 mt-0.5">+91 98201 44520 (Fast prescription verification)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#14232E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14232E] block">Clinic & Lab Hours</strong>
                    <p className="text-slate-500 mt-0.5">Monday – Sunday: 10:00 AM – 9:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map preview representation */}
            <div className="bg-[#14232E] text-white rounded-xl p-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E4232C]">
                VISIT IN PERSON
              </span>
              <h3 className="text-base font-bold">5 Optical Stores in India</h3>
              <p className="text-xs text-slate-300">
                Experience physical frames, try digital centering scanners, and receive computerized eye tests.
              </p>
              <div className="pt-2">
                <a href="/store-locator" className="inline-block text-xs font-bold text-white hover:text-[#E4232C] underline">
                  View Pan-India Store Locator →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#14232E] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below and an optometrist or customer care specialist will reach out.
            </p>

            {submitted ? <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 space-y-2 text-center">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <h3 className="text-sm font-bold">Message Received</h3>
                <p className="text-xs">
                  Thank you! Your ticket has been assigned to our senior optical care desk. We will contact you shortly.
                </p>
              </div> : <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Your Name *
                    </label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Priya Sharma" className="w-full px-3.5 py-2.5 border border-slate-200 rounded text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Email Address *
                    </label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="priya@example.com" className="w-full px-3.5 py-2.5 border border-slate-200 rounded text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Phone Number
                    </label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98200..." className="w-full px-3.5 py-2.5 border border-slate-200 rounded text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#14232E] block mb-1">
                      Subject
                    </label>
                    <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]">
                      <option value="Prescription Query">Prescription Query / Power Submission</option>
                      <option value="Order Tracking">Order Tracking & Dispatch</option>
                      <option value="Return or Exchange">14-Day Return or Exchange</option>
                      <option value="Store Appointment">Store Appointment Assistance</option>
                      <option value="Corporate / Bulk Inquiry">Corporate / Bulk Eyewear</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#14232E] block mb-1">
                    Your Message *
                  </label>
                  <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Provide details about your frame preference or prescription power..." className="w-full px-3.5 py-2.5 border border-slate-200 rounded text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
                </div>

                <button type="submit" className="px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-2">
                  <Send size={14} />
                  <span>SEND MESSAGE</span>
                </button>
              </form>}
          </div>
        </div>
      </div>
    </div>;
};