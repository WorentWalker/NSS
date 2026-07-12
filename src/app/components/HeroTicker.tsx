type HeroTickerProps = {
  items: string[];
};

export function HeroTicker({ items }: HeroTickerProps) {
  const renderGroup = (keyPrefix: string) => (
    <ul className="hero-ticker__group">
      {items.map((item) => (
        <li key={`${keyPrefix}-${item}`} className="hero-ticker__item">
          <span className="hero-ticker__mark" aria-hidden>+</span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hero-ticker" aria-label="Partners">
      <div className="hero-ticker__viewport">
        <div className="hero-ticker__track">
          {renderGroup("a")}
          {renderGroup("b")}
        </div>
      </div>

      <style>{`
        .hero-ticker {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          background: rgba(255, 255, 255, 0.95);
          border-top: 1px solid #D4DEE9;
          padding: 14px 0;
        }
        .hero-ticker__viewport {
          overflow: hidden;
          width: 100%;
        }
        .hero-ticker__track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: nss-marquee 32s linear infinite;
        }
        .hero-ticker__group {
          display: flex;
          align-items: center;
          gap: 40px;
          margin: 0;
          padding: 0 40px 0 0;
          list-style: none;
        }
        .hero-ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #64748B;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .hero-ticker__mark {
          color: #2DC653;
          font-weight: 700;
        }
        @keyframes nss-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ticker__track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            gap: 12px 24px;
          }
          .hero-ticker__group {
            padding: 0;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px 24px;
          }
          .hero-ticker__group:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
