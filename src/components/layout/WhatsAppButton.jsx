import React from 'react';
import { MessageCircle } from 'lucide-react';
export const WhatsAppButton = () => {
  const phoneNumber = '919820144520';
  const message = encodeURIComponent('Hi The Lens Hut, I would like assistance with choosing eyeglasses / submitting my prescription.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2" aria-label="Chat with optometrist on WhatsApp">
      <MessageCircle size={22} className="fill-white/20 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
        Optometrist Support
      </span>
    </a>;
};