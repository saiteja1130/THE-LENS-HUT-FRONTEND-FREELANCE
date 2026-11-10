import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles
} from 'lucide-react';

export const ProductImageGallery = ({
  images = [],
  productName = 'Eyewear',
  discountPercent = 0,
  isBestSeller = false,
  isNewArrival = false,
  activeThumb = 0,
  onThumbChange,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  // Hover zoom lens state
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  const displayImages = images && images.length > 0 ? images : ['/images/placeholder-glasses.png'];
  const currentImage = displayImages[activeThumb] || displayImages[0];

  // Mouse move for desktop zoom preview
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setLensPosition({ x, y });
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxZoom(1);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxZoom(1);
    document.body.style.overflow = 'unset';
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % displayImages.length);
        setLightboxZoom(1);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
        setLightboxZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, displayImages.length]);

  // Clean, single prioritized badge
  const renderBadge = () => {
    if (discountPercent > 0) {
      return (
        <span className="bg-[#E4232C] text-white text-[11px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase shadow-2xs">
          {discountPercent}% OFF
        </span>
      );
    }
    if (isBestSeller) {
      return (
        <span className="bg-[#14232E] text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase flex items-center gap-1 shadow-2xs">
          <Sparkles size={11} className="text-amber-400" />
          Best Seller
        </span>
      );
    }
    if (isNewArrival) {
      return (
        <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-2xs">
          New Arrival
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Visual Showcase Stage */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
        
        {/* Sleek Vertical Thumbnails on Desktop / Horizontal on Mobile */}
        {displayImages.length > 1 && (
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] shrink-0 scrollbar-none py-1">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onThumbChange(idx)}
                className={`relative w-16 h-16 sm:w-19 sm:h-19 rounded-xl border p-1 bg-white overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
                  activeThumb === idx
                    ? 'border-[#E4232C] ring-2 ring-[#E4232C]/20 shadow-xs'
                    : 'border-slate-200/90 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
                aria-label={`Switch to image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Product Stage */}
        <div className="group relative flex-1 aspect-square sm:aspect-[4/3] bg-[#F8F9FA] rounded-2xl border border-slate-200/80 flex items-center justify-center overflow-hidden select-none">
          
          {/* Top Left Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
            {renderBadge()}
          </div>

          {/* Top Right Action: Fullscreen */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <button
              type="button"
              onClick={() => handleOpenLightbox(activeThumb)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/90 hover:bg-white text-slate-600 hover:text-[#14232E] border border-slate-200/70 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title="Full screen preview"
              aria-label="Full screen preview"
            >
              <Maximize2 size={15} />
            </button>
          </div>

          {/* Carousel Left / Right Arrows (clean hover micro-interaction) */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  onThumbChange((activeThumb - 1 + displayImages.length) % displayImages.length)
                }
                className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#14232E] flex items-center justify-center shadow-sm transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => onThumbChange((activeThumb + 1) % displayImages.length)}
                className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#14232E] flex items-center justify-center shadow-sm transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Main Stage Image with Zoom Lens */}
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            onClick={() => handleOpenLightbox(activeThumb)}
            className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
          >
            <img
              src={currentImage}
              alt={productName}
              className={`max-w-full max-h-full object-contain transition-opacity duration-200 ${
                isHovering ? 'opacity-0 sm:opacity-0' : 'opacity-100'
              }`}
            />

            {/* Desktop Zoom Magnifier */}
            {isHovering && (
              <div
                className="absolute inset-0 hidden sm:block pointer-events-none rounded-xl overflow-hidden bg-white"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                  backgroundSize: '220%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
          </div>

          {/* Mobile Dot Indicators */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-2.5 inset-x-0 sm:hidden flex items-center justify-center gap-1.5 z-10 pointer-events-none">
              {displayImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeThumb === i ? 'w-5 bg-[#E4232C]' : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#14232E]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold">{productName}</h3>
              <p className="text-xs text-slate-400">
                Image {lightboxIndex + 1} of {displayImages.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoom((z) => Math.min(2.5, z + 0.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
              <button
                type="button"
                onClick={() => setLightboxZoom((z) => Math.max(1, z - 0.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut size={18} />
              </button>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2 rounded-lg bg-[#E4232C] hover:bg-[#C81921] text-white transition-colors cursor-pointer ml-2"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lightbox Stage */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
                    setLightboxZoom(1);
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex((prev) => (prev + 1) % displayImages.length);
                    setLightboxZoom(1);
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}

            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={displayImages[lightboxIndex]}
                alt={`${productName} fullscreen view`}
                style={{ transform: `scale(${lightboxZoom})`, transition: 'transform 0.25s ease' }}
                className="max-w-full max-h-[78vh] object-contain drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>

          {/* Lightbox Footer Thumbnails */}
          {displayImages.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto pt-2 border-t border-white/10">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxZoom(1);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border p-0.5 bg-white/10 cursor-pointer transition-all ${
                    lightboxIndex === i ? 'border-[#E4232C] ring-2 ring-[#E4232C]' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
