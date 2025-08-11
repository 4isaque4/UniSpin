export default function Logo({ size = 24 }) {
    const s = size;
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" aria-label="UniSpin" role="img">
        <defs>
          <linearGradient id="uni" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="100%" stopColor="var(--accent-teal)" />
          </linearGradient>
        </defs>
        {/* quatro losangos formando uma hélice */}
        <g transform="translate(24 24) rotate(45)">
          <rect x="-6" y="-18" rx="4" ry="4" width="12" height="12" fill="url(#uni)" />
          <rect x="6" y="-6"   rx="4" ry="4" width="12" height="12" fill="url(#uni)" />
          <rect x="-18" y="6"  rx="4" ry="4" width="12" height="12" fill="url(#uni)" />
          <rect x="-6" y="6"   rx="4" ry="4" width="12" height="12" fill="url(#uni)" />
        </g>
      </svg>
    );
  }
  