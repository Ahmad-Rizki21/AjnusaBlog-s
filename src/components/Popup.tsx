'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Popup {
  id: string;
  title: string;
  type: 'IMAGE' | 'HTML';
  content: string;
  link: string | null;
  delay: number;
  showClose: boolean;
  width: number | null;
  height: number | null;
}

export function Popup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('popup_shown') !== null;
  });

  useEffect(() => {
    if (hasShown) return;

    // Fetch active popup
    const fetchPopup = async () => {
      try {
        const response = await fetch('/api/admin/popups');
        const data = await response.json();
        if (data.popup) {
          setPopup(data.popup);
          // Show popup after delay
          setTimeout(() => {
            setIsVisible(true);
          }, data.popup.delay * 1000);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };

    fetchPopup();
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown for this session
    localStorage.setItem('popup_shown', Date.now().toString());
  };

  const handleClick = () => {
    if (popup?.link) {
      window.open(popup.link, '_blank');
    }
    handleClose();
  };

  if (!popup || !isVisible || hasShown) {
    return null;
  }

  // Auto size based on image, with max limits to fit screen
  const style: React.CSSProperties = popup.type === 'IMAGE' ? {
    maxWidth: popup.width ? `${popup.width}px` : '90vw',
    maxHeight: popup.height ? `${popup.height}px` : '90vh',
  } : {
    maxWidth: popup.width ? `${popup.width}px` : '500px',
    maxHeight: popup.height ? `${popup.height}px` : '80vh',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300"
        style={style}
        onClick={handleClick}
      >
        {/* Close Button */}
        {popup.showClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
          >
            <X size={18} />
          </button>
        )}

        {/* Popup Content */}
        {popup.type === 'IMAGE' ? (
          <img
            src={popup.content}
            alt={popup.title}
            className="w-full h-full object-contain cursor-pointer"
          />
        ) : (
          <div
            className="p-6 cursor-pointer"
            dangerouslySetInnerHTML={{ __html: popup.content }}
          />
        )}
      </div>
    </div>
  );
}
