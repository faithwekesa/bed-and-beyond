export default function MvBadge({ kind }: { kind: 'target' | 'eye' }) {
  return (
    <div className="mvc-badge" aria-hidden="true">
      <svg className="mvc-ring" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="270 30 210 80.6"
          transform="rotate(-70 100 100)"
        />
      </svg>
      <span className="mvc-disc">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {kind === 'target' ? (
            <>
              <circle cx="30" cy="34" r="22" />
              <circle cx="30" cy="34" r="14" />
              <circle cx="30" cy="34" r="6" />
              <path d="M30 34 L54 10" />
              <path d="M54 10 L54 20 M54 10 L44 10" />
            </>
          ) : (
            <>
              <path d="M5 32 C13 18 23 12 32 12 C41 12 51 18 59 32 C51 46 41 52 32 52 C23 52 13 46 5 32 Z" />
              <circle cx="32" cy="32" r="9" />
              <circle cx="32" cy="32" r="3" fill="currentColor" />
            </>
          )}
        </svg>
      </span>
    </div>
  )
}
