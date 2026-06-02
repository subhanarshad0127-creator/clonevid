import React from 'react';

/**
 * PayPalButton — styled subscription button with PayPal gold branding.
 * Props: planName, price, planId, onClick
 */
export default function PayPalButton({ planName, price, planId, onClick }) {
  const handleClick = async () => {
    if (onClick) {
      onClick();
      return;
    }
    try {
      const res = await fetch('/api/paypal/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.approvalUrl) {
        window.open(data.approvalUrl, '_blank');
      }
    } catch (err) {
      console.error('PayPal subscription error:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-95"
      style={{ background: '#FFC439', color: '#003087' }}
    >
      {/* PayPal logo circle */}
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ background: '#003087' }}
      >
        PP
      </span>
      Subscribe with PayPal
      {price && (
        <span className="ml-1 opacity-70 font-normal text-xs">
          ${price}/mo
        </span>
      )}
    </button>
  );
}
