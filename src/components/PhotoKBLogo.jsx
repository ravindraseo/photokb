import React, { useId } from 'react';
import { Link } from 'react-router-dom';

/**
 * Clean & Simple Camera Vector Icon for PhotoKB
 * Instantly recognizable modern camera silhouette with lens, flash, and shutter button.
 * Uses unique SVG IDs so multiple instances (Header and Footer) never collide.
 */
export function PhotoKBIcon({ className = "w-10 h-10" }) {
  const rawId = useId();
  const uid = rawId.replace(/[:]/g, '');
  const blueGradId = `cam-blue-${uid}`;
  const lensGradId = `cam-lens-${uid}`;
  const shadowFilterId = `cam-shadow-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PhotoKB Camera Logo"
    >
      <defs>
        {/* Modern Royal Blue Gradient */}
        <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Deep Lens Glass Gradient */}
        <linearGradient id={lensGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Soft Drop Shadow */}
        <filter id={shadowFilterId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1d4ed8" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter={`url(#${shadowFilterId})`}>
        {/* Shutter Button (Top-Left) */}
        <rect x="20" y="14" width="15" height="8" rx="4" fill="#1e40af" />

        {/* Top Viewfinder Bump */}
        <path
          d="M36 22 L42 12 C43 10.5 44.5 10 46 10 L54 10 C55.5 10 57 10.5 58 12 L64 22 Z"
          fill={`url(#${blueGradId})`}
        />

        {/* Main Camera Body (Rounded Rectangle) */}
        <rect x="8" y="22" width="84" height="68" rx="20" fill={`url(#${blueGradId})`} />

        {/* Top Highlight Stripe (Gives 3D Camera Feel) */}
        <path
          d="M20 27 H80"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />

        {/* Outer Lens Bezel (Crisp White Ring) */}
        <circle cx="50" cy="57" r="23" fill="#ffffff" />

        {/* Inner Lens Housing (Dark Ring) */}
        <circle cx="50" cy="57" r="19" fill={`url(#${lensGradId})`} />

        {/* Aperture Ring Accent */}
        <circle cx="50" cy="57" r="13" fill="#1e3a8a" />
        <circle cx="50" cy="57" r="8" fill="#38bdf8" />

        {/* Glass Optical Glare / Shimmer Dots */}
        <circle cx="45" cy="52" r="3" fill="#ffffff" />
        <circle cx="53" cy="61" r="1.5" fill="#ffffff" fillOpacity="0.7" />

        {/* Red Camera Flash / Status Indicator (Top-Right) */}
        <circle cx="76" cy="35" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      </g>
    </svg>
  );
}

/**
 * Unified PhotoKB Brand Logo Component
 * Identical across Header and Footer with consistent camera icon, brand colors, and typography.
 */
export default function PhotoKBLogo({ 
  showSubtitle = true,
  className = ""
}) {
  return (
    <Link to="/" className={`inline-flex items-center space-x-3 group select-none ${className}`}>
      {/* Clean Camera Icon with gentle hover lift */}
      <div className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
        <PhotoKBIcon className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-sm" />
      </div>

      {/* Brand Text & Tagline - Exact same in Header and Footer */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            Photo<span className="text-blue-600 font-black">KB</span>
          </span>
          <span className="inline-block text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded bg-rose-500 text-white shadow-xs">
            USA
          </span>
        </div>

        {showSubtitle && (
          <span className="text-[11px] font-medium tracking-tight mt-1 text-slate-500">
            Free Online Tools for Everyone
          </span>
        )}
      </div>
    </Link>
  );
}
