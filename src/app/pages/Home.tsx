import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useI18n } from "../i18n";
import { PageSlogan } from "../components/PageSlogan";
import { HeroTicker } from "../components/HeroTicker";
import { realizedProjects, type RealizedProject } from "../data/realizedProjects";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  ArrowRight, Play, Zap, Battery, Shield, Wifi, Wrench, Building2,
  ChevronRight, ChevronLeft, MapPin, CheckCircle2, TrendingUp, Clock,
  Search, PenTool, Package, Settings, Sun, Plug, Volume2, Layers,
} from "lucide-react";
import nssProduct1 from "figma:asset/2c5afeeeadc1c10b241a86ed9503d116ea92e554.png";
import nssProduct2 from "figma:asset/006bec9218f291152af2d36ed79cef9a6b00360a.png";
import nssProduct3 from "figma:asset/95fb35ccae0a21c77bf67f3116e76442824da4a1.png";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";
const ACCENT = "#F97316";
const GREEN_GLOW = "rgba(45,198,83,0.12)";

// Counter hook
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

function SectionTitle({ overline, title, subtitle, center = false }: { overline: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, justifyContent: center ? "center" : "flex-start" }}>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
        <span style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "var(--tracking-caps-md, 0.058em)", textTransform: "uppercase" }}>{overline}</span>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
      </div>
      <h2 style={{
        fontFamily: "'Onest', sans-serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 800,
        color: TEXT,
        lineHeight: 1.2,
        marginBottom: subtitle ? 16 : 0,
      }}>{title}</h2>
      {subtitle && <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7, maxWidth: center ? 600 : "100%", margin: center ? "0 auto" : "0" }}>{subtitle}</p>}
    </div>
  );
}

// ─── Category Card ───────────────────────────────────────────────────────────
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag: string;
  specs: string[];
  color: string;
  img: string;
  ctaLabel: string;
}
function CategoryCard({ icon, title, subtitle, tag, specs, color, img, ctaLabel }: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${hovered ? color + "88" : BORDER}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 8px 40px ${color}25` : "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))" }} />
        <div style={{
          position: "absolute", top: 16, right: 16,
          backgroundColor: `${color}ee`,
          borderRadius: 100, padding: "4px 12px",
          color: "#fff", fontSize: 11, fontWeight: 700,
        }}>
          {tag}
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ color }}>{icon}</div>
          <div>
            <div style={{ color: TEXT, fontSize: 16, fontWeight: 800, fontFamily: "'Onest', sans-serif" }}>{title}</div>
            <div style={{ color: MUTED, fontSize: 13 }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {specs.map((spec) => (
            <span key={spec} style={{ padding: "4px 10px", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, color: MUTED, fontSize: 12, fontWeight: 500 }}>
              {spec}
            </span>
          ))}
        </div>
        <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          {ctaLabel} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
interface FeatureCardProps { icon: React.ReactNode; title: string; desc: string }
function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${hovered ? "rgba(45,198,83,0.4)" : BORDER}`,
        borderRadius: 12, padding: 28,
        transition: "all 0.3s",
        boxShadow: hovered ? "0 8px 32px rgba(45,198,83,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{
        width: 48, height: 48,
        backgroundColor: "rgba(45,198,83,0.1)",
        border: "1px solid rgba(45,198,83,0.25)",
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: NSS_GREEN, marginBottom: 16,
      }}>
        {icon}
      </div>
      <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Onest', sans-serif" }}>{title}</h3>
      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ─── Product Showcase Card ────────────────────────────────────────────────────
interface ShowcaseCardProps {
  name: string; type: string; badge: string; color: string;
  specs: { label: string; value: string }[]; tags: string[]; warranty: string;
  quoteLabel: string;
}
function ShowcaseCard({ name, type, badge, color, specs, tags, warranty, quoteLabel }: ShowcaseCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${hovered ? color + "66" : BORDER}`,
        borderRadius: 16, padding: 24,
        transition: "all 0.3s",
        boxShadow: hovered ? `0 8px 32px ${color}18` : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", color, display: "block", marginBottom: 4 }}>{type}</span>
          <h3 style={{ color: TEXT, fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{name}</h3>
        </div>
        <span style={{ backgroundColor: `${color}18`, border: `1px solid ${color}55`, borderRadius: 6, padding: "4px 10px", color, fontSize: 13, fontWeight: 800, overflowWrap: "anywhere", textAlign: "right", flexShrink: 0, alignSelf: "flex-start" }}>
          {badge}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {specs.map((s) => (
          <div key={s.label} style={{ backgroundColor: SURFACE, borderRadius: 8, padding: "10px 12px", border: `1px solid ${BORDER}` }}>
            <div style={{ color: MUTED, fontSize: 11, marginBottom: 2 }}>{s.label}</div>
            <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ padding: "3px 8px", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, color: MUTED, fontSize: 11, fontWeight: 500 }}>{tag}</span>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: MUTED, fontSize: 11 }}>{warranty}</span>
        <Link to="/contact" style={{ color, fontSize: 12, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          {quoteLabel} <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// ─── Realized project showcase ────────────────────────────────────────────────
function RealizedProjectShowcase({ project }: { project: RealizedProject }) {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const { media } = project;
  const active = media[activeIndex];
  const tags = project.tagKeys.map((key) => t(key));

  const goPrev = () => setActiveIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  useEffect(() => {
    setActiveIndex(0);
  }, [project.id]);

  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex, project.id]);

  const mediaAlt = active.type === "video" && project.altVideoKey
    ? t(project.altVideoKey)
    : t(project.altPhotoKey, { n: activeIndex + 1 });

  const thumbLabel = (item: typeof active, i: number) =>
    item.type === "video" && project.altVideoKey
      ? t(project.altVideoKey)
      : t(project.altPhotoKey, { n: i + 1 });

  return (
    <div className="realized-project">
      <div className="realized-project__layout">
        <div className="realized-project__gallery">
          <div className="realized-project__viewer">
            {active.type === "video" ? (
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                controls
                playsInline
                className="realized-project__media"
              />
            ) : (
              <ImageWithFallback
                key={active.src}
                src={active.src}
                alt={mediaAlt}
                className="realized-project__media"
              />
            )}

            <button type="button" onClick={goPrev} aria-label={t("home.projectGalleryPrev")} className="realized-project__nav realized-project__nav--prev">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={goNext} aria-label={t("home.projectGalleryNext")} className="realized-project__nav realized-project__nav--next">
              <ChevronRight size={20} />
            </button>

            <span className="realized-project__counter">
              {t("home.projectGalleryCounter", { current: activeIndex + 1, total: media.length })}
            </span>
          </div>

          <div className="realized-project__thumbs" ref={thumbsRef}>
            {media.map((item, i) => (
              <button
                key={`${project.id}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={thumbLabel(item, i)}
                aria-current={activeIndex === i ? "true" : undefined}
                className={`realized-project__thumb${activeIndex === i ? " realized-project__thumb--active" : ""}`}
              >
                <ImageWithFallback
                  src={item.type === "video" ? item.poster : item.src}
                  alt=""
                  loading="lazy"
                />
                {item.type === "video" && (
                  <span className="realized-project__thumb-play">
                    <Play size={14} fill="#fff" color="#fff" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="realized-project__info">
          <span style={{
            alignSelf: "flex-start",
            backgroundColor: "rgba(45,198,83,0.1)",
            border: "1px solid rgba(45,198,83,0.25)",
            color: DARK_GREEN,
            padding: "5px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {t(project.categoryKey)}
          </span>

          <h3 style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 800,
            color: TEXT,
            lineHeight: 1.25,
            marginBottom: 12,
          }}>
            {t(project.titleKey)}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <MapPin size={15} color={NSS_GREEN} />
            <span style={{ color: MUTED, fontSize: 14, fontWeight: 500 }}>{t(project.locationKey)}</span>
          </div>

          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24, flex: 1 }}>
            {t(project.descKey)}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                color: MUTED,
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              alignSelf: "flex-start",
              background: "linear-gradient(135deg, #2DC653, #1DA040)",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(45, 198, 83, 0.32)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(45, 198, 83, 0.42)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(45, 198, 83, 0.32)";
            }}
          >
            {t(project.ctaKey)} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .realized-project {
          max-width: 100%;
          background-color: ${WHITE};
          border: 1px solid ${BORDER};
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
        }
        .realized-project__layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: 0;
        }
        .realized-project__gallery {
          min-width: 0;
          padding: 20px;
          background-color: ${SURFACE};
          border-right: 1px solid ${BORDER};
          overflow: hidden;
        }
        .realized-project__viewer {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 420px;
          margin-bottom: 12px;
          border-radius: 14px;
          overflow: hidden;
          background-color: #fff;
        }
        .realized-project__media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background-color: #fff;
        }
        video.realized-project__media {
          background-color: #000;
        }
        .realized-project__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background-color: rgba(255, 255, 255, 0.92);
          color: ${TEXT};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.15);
          z-index: 2;
        }
        .realized-project__nav--prev { left: 10px; }
        .realized-project__nav--next { right: 10px; }
        .realized-project__counter {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background-color: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(6px);
        }
        .realized-project__info {
          min-width: 0;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
        }
        .realized-project__thumbs {
          display: flex;
          gap: 8px;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 4px;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
        }
        .realized-project__thumbs::-webkit-scrollbar {
          height: 6px;
        }
        .realized-project__thumbs::-webkit-scrollbar-thumb {
          background: ${BORDER};
          border-radius: 999px;
        }
        .realized-project__thumb {
          position: relative;
          flex: 0 0 72px;
          width: 72px;
          height: 54px;
          padding: 0;
          border: 2px solid ${BORDER};
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: #fff;
          opacity: 0.78;
          scroll-snap-align: start;
          transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
        }
        .realized-project__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .realized-project__thumb--active {
          border-color: ${NSS_GREEN};
          opacity: 1;
          transform: scale(1.04);
        }
        .realized-project__thumb-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.38);
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .realized-project__layout { grid-template-columns: 1fr !important; }
          .realized-project__gallery { border-right: none !important; border-bottom: 1px solid ${BORDER}; }
        }
      `}</style>
    </div>
  );
}

const MARSTEK_HERO_IMG = "/assets/marstek/lifestyle.png";
const MARSTEK_HERO_FRONT = "/assets/marstek/front.png";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useI18n();

  const tickerItems = [
    t("home.tickerItem0"),
    t("home.tickerItem1"),
    t("home.tickerItem2"),
    t("home.tickerItem3"),
    t("home.tickerItem4"),
    t("home.tickerItem5"),
    t("home.tickerItem6"),
    t("home.tickerItem7"),
  ];

  const marstekSpecs = [
    { value: t("home.marstekSpecCapacity"), label: t("home.marstekSpecCapacityLbl") },
    { value: t("home.marstekSpecPower"), label: t("home.marstekSpecPowerLbl") },
    { value: t("home.marstekSpecDepth"), label: t("home.marstekSpecDepthLbl") },
    { value: t("home.marstekSpecPlug"), label: t("home.marstekSpecPlugLbl") },
  ];

  const marstekBenefits = [
    { icon: <Plug size={16} />, text: t("home.marstekBenefit0") },
    { icon: <Volume2 size={16} />, text: t("home.marstekBenefit1") },
    { icon: <Shield size={16} />, text: t("home.marstekBenefit2") },
    { icon: <Layers size={16} />, text: t("home.marstekBenefit3") },
  ];

  const marstekDetails = [
    t("home.marstekDetailEff"),
    t("home.marstekDetailSine"),
    t("home.marstekDetailComm"),
    t("home.marstekDetailSize"),
  ];

  return (
    <section className="hero-section" style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center",
      background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 40%, #F0F9FF 100%)",
    }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.10) 0%, transparent 70%)", top: -200, right: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.07) 0%, transparent 70%)", bottom: -150, left: -100, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(45,198,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,198,83,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 100px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: TEXT }} />
              <span style={{ color: TEXT, fontSize: 13, fontWeight: 600 }}>{t("home.marstekBadge")}</span>
            </div>

            <PageSlogan page="home" />

            <h1 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.16, color: TEXT, marginBottom: 24, overflowWrap: "anywhere", wordBreak: "break-word" }}>
              {t("home.marstekTitle")}
            </h1>

            <p style={{ color: MUTED, fontSize: 18, lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
              {t("home.marstekIntro")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20, maxWidth: 480 }}>
              {marstekSpecs.map((spec) => (
                <div key={spec.label} style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ color: TEXT, fontSize: 18, fontWeight: 800, fontFamily: "'Onest', sans-serif", lineHeight: 1.2, marginBottom: 4 }}>{spec.value}</div>
                  <div style={{ color: MUTED, fontSize: 11, lineHeight: 1.4 }}>{spec.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32, maxWidth: 520 }}>
              {marstekBenefits.map((b) => (
                <div key={b.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: TEXT, lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: NSS_GREEN }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>

            <Link to="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,198,83,0.35)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(45,198,83,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,198,83,0.35)"; }}
            >
              {t("home.marstekCta")} <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-image-col">
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(45,198,83,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div className="hero-marstek-showcase">
              <div className="hero-marstek-showcase__card">
                <ImageWithFallback
                  src={MARSTEK_HERO_IMG}
                  alt={t("home.marstekAltProduct")}
                  className="hero-marstek-showcase__img"
                />
                <ImageWithFallback
                  src={MARSTEK_HERO_FRONT}
                  alt=""
                  className="hero-marstek-showcase__front"
                  aria-hidden
                />
              </div>
              <div className="hero-marstek-showcase__details">
                {marstekDetails.map((detail) => (
                  <span key={detail} className="hero-marstek-showcase__detail">{detail}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroTicker items={tickerItems} />

      <style>{`
        .hero-section {
          overflow: hidden;
        }
        .hero-marstek-showcase {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
        }
        .hero-marstek-showcase__card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1px solid ${BORDER};
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
        }
        .hero-marstek-showcase__img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 5;
          object-fit: cover;
        }
        .hero-marstek-showcase__front {
          position: absolute;
          right: 16px;
          bottom: 16px;
          width: 38%;
          max-width: 140px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 20px rgba(15, 23, 42, 0.25));
          border-radius: 8px;
        }
        .hero-marstek-showcase__details {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
          justify-content: center;
        }
        .hero-marstek-showcase__detail {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: ${MUTED};
          background: ${WHITE};
          border: 1px solid ${BORDER};
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image-col { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── PRODUCT CATEGORIES ───────────────────────────────────────────────────────
function ProductCategoriesSection() {
  const { t } = useI18n();
  const categories = [
    { icon: <Sun size={28} />, title: t("home.catPanelsTitle"), subtitle: t("home.catPanelsSub"), tag: t("home.catPanelsTag"), specs: [t("home.catPanelsSpec0"), t("home.catPanelsSpec1"), t("home.catPanelsSpec2"), t("home.catPanelsSpec3")], color: NSS_GREEN, img: "https://images.unsplash.com/photo-1651330712803-48d81811168f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", ctaLabel: t("home.viewProducts") },
    { icon: <Zap size={28} />, title: t("home.catInvTitle"), subtitle: t("home.catInvSub"), tag: t("home.catInvTag"), specs: [t("home.catInvSpec0"), t("home.catInvSpec1"), t("home.catInvSpec2"), t("home.catInvSpec3")], color: ACCENT, img: nssProduct1, ctaLabel: t("home.viewProducts") },
    { icon: <Battery size={28} />, title: t("home.catBatTitle"), subtitle: t("home.catBatSub"), tag: t("home.catBatTag"), specs: [t("home.catBatSpec0"), t("home.catBatSpec1"), t("home.catBatSpec2"), t("home.catBatSpec3")], color: "#6366F1", img: nssProduct3, ctaLabel: t("home.viewProducts") },
  ];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.prodOverline")} title={t("home.prodTitle")} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {categories.map((cat) => <CategoryCard key={cat.title} {...cat} />)}
        </div>
      </div>
    </section>
  );
}

// ─── WHY NSS ───────────────────────────────────────────────────────────────────
function WhyNSSSection() {
  const { t } = useI18n();
  const features = [
    { icon: <Building2 size={24} />, title: t("home.feat0Title"), desc: t("home.feat0Desc") },
    { icon: <Zap size={24} />, title: t("home.feat1Title"), desc: t("home.feat1Desc") },
    { icon: <Battery size={24} />, title: t("home.feat2Title"), desc: t("home.feat2Desc") },
    { icon: <Shield size={24} />, title: t("home.feat3Title"), desc: t("home.feat3Desc") },
    { icon: <Wifi size={24} />, title: t("home.feat4Title"), desc: t("home.feat4Desc") },
    { icon: <Wrench size={24} />, title: t("home.feat5Title"), desc: t("home.feat5Desc") },
  ];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.whyOverline")} title={t("home.whyTitle")} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map((feat) => <FeatureCard key={feat.title} {...feat} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS ────────────────────────────────────────────────────────────────
function SolutionsSection() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"industrial" | "commercial" | "green">("industrial");
  const tabs = [
    { id: "industrial" as const, label: t("home.tabIndustrial") },
    { id: "commercial" as const, label: t("home.tabCommercial") },
    { id: "green" as const, label: t("home.tabGreen") },
  ];

  const content = {
    industrial: {
      img: "https://images.unsplash.com/photo-1726866492047-7f9516558c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: t("home.industrialTitle"),
      desc: t("home.industrialDesc"),
      package: [t("home.industrialBul0"), t("home.industrialBul1"), t("home.industrialBul2"), t("home.industrialBul3")],
    },
    commercial: {
      img: "https://images.unsplash.com/photo-1674252281682-2eec258cfa30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: t("home.commercialTitle"),
      desc: t("home.commercialDesc"),
      package: [t("home.commercialBul0"), t("home.commercialBul1"), t("home.commercialBul2"), t("home.commercialBul3")],
    },
    green: {
      img: "https://images.unsplash.com/photo-1771479755055-6a305f50845e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: t("home.greenTitle"),
      desc: t("home.greenDesc"),
      package: [t("home.greenBul0"), t("home.greenBul1"), t("home.greenBul2"), t("home.greenBul3")],
    },
  };

  const active = content[activeTab];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.solOverline")} title={t("home.solTitle")} subtitle={t("home.solCombined")} center />
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button type="button" key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 24px", borderRadius: 8, border: `1px solid ${activeTab === tab.id ? NSS_GREEN : BORDER}`, backgroundColor: activeTab === tab.id ? "rgba(45,198,83,0.1)" : WHITE, color: activeTab === tab.id ? DARK_GREEN : MUTED, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="solutions-grid">
          <div style={{ borderRadius: 16, overflow: "hidden", height: 380, position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
            <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Onest', sans-serif", fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 16 }}>{active.title}</h3>
            <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>{active.desc}</p>
            <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 16 }}>{t("home.systemPackageLabel")}</div>
              {active.package.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={16} color={NSS_GREEN} />
                  <span style={{ color: TEXT, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/solutions" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,198,83,0.3)" }}>
              {t("home.moreInfo")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .solutions-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────
function FeaturedProductsSection() {
  const { t } = useI18n();
  const products = [
    {
      name: "Q-Sun Mercury QN-590HT-06",
      type: t("home.fcTypePanel"),
      badge: "590W",
      color: NSS_GREEN,
      specs: [
        { label: t("home.fcLblEff"), value: "22.8%" },
        { label: t("home.fcLblCell"), value: "N-Type" },
        { label: t("home.fcLblVoc"), value: "52.16V" },
        { label: t("home.fcLblVoltage"), value: "1500VDC" },
      ],
      tags: [t("home.tagBifacial"), t("home.tagDoubleGlass"), t("home.tagIEC")],
      warranty: t("home.fcWarranty0"),
      quoteLabel: t("home.specQuoteShort"),
    },
    {
      name: "GoodWe GW80K-SMT",
      type: t("home.fcTypeInvString"),
      badge: "80kW",
      color: ACCENT,
      specs: [
        { label: t("home.fcLblEff"), value: "98.6%" },
        { label: t("home.fcLblMppts"), value: "6" },
        { label: t("home.fcLblDc"), value: "1100V" },
        { label: t("home.fcLblProt"), value: "IP66" },
      ],
      tags: [t("home.tagThreePhase"), t("home.tagAfci"), t("home.tagRf")],
      warranty: t("home.fcWarranty1"),
      quoteLabel: t("home.specQuoteShort"),
    },
    {
      name: "QCL QCL125KW-261KWH",
      type: t("home.fcTypeBatCabinet"),
      badge: "261kWh",
      color: "#6366F1",
      specs: [
        { label: t("home.fcLblPowerOut"), value: "125kW" },
        { label: t("home.fcLblDc"), value: "DC 832V" },
        { label: t("home.fcLblCool"), value: t("home.tagLiquid") },
        { label: t("home.fcLblWeight"), value: "2500kg" },
      ],
      tags: [t("home.tagIp54"), t("home.tag4g"), t("home.tagGrid")],
      warranty: t("home.fcWarranty2"),
      quoteLabel: t("home.specQuoteShort"),
    },
    {
      name: "RochexEnergy 125kW/261kWh",
      type: t("home.fcTypeEss"),
      badge: "261kWh",
      color: "#8B5CF6",
      specs: [
        { label: t("home.fcLblEnergy"), value: "261kWh" },
        { label: t("home.fcLblPower"), value: "125kW" },
        { label: t("home.fcLblCfg"), value: "1P52S" },
        { label: t("home.fcLblIp"), value: "IP54" },
      ],
      tags: [t("home.tagTuvCe"), t("home.tagLfp"), t("home.tagLiquid")],
      warranty: t("home.fcWarranty3"),
      quoteLabel: t("home.specQuoteShort"),
    },
  ];

  return (
    <section style={{ backgroundColor: SURFACE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.featuredOverline")} title={t("home.featuredTitle")} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {products.map((p) => <ShowcaseCard key={p.name} {...p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${NSS_GREEN}`, color: NSS_GREEN, padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all 0.2s", backgroundColor: WHITE }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(45,198,83,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = WHITE; }}
          >
            {t("home.seeAllProducts")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  const { t } = useI18n();
  const [activeProjectId, setActiveProjectId] = useState(realizedProjects[0].id);
  const activeProject = realizedProjects.find((p) => p.id === activeProjectId) ?? realizedProjects[0];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle
          overline={t("home.projectsOverline")}
          title={t("home.projectsTitle")}
          subtitle={t("home.projectsSubtitle")}
          center
        />

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {realizedProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProjectId(project.id)}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: `1px solid ${activeProjectId === project.id ? NSS_GREEN : BORDER}`,
                backgroundColor: activeProjectId === project.id ? "rgba(45,198,83,0.1)" : WHITE,
                color: activeProjectId === project.id ? DARK_GREEN : MUTED,
                fontSize: 14,
                fontWeight: activeProjectId === project.id ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeProjectId === project.id ? "0 2px 10px rgba(45,198,83,0.12)" : "none",
              }}
            >
              {t(project.titleKey)}
            </button>
          ))}
        </div>

        <RealizedProjectShowcase key={activeProject.id} project={activeProject} />
      </div>
    </section>
  );
}

// ─── SPECS COMPARISON ─────────────────────────────────────────────────────────
function SpecsComparisonSection() {
  const { t } = useI18n();
  const specs = [
    { label: t("home.specRowPanels"), residential: "Q-Sun 570W ×8", ci: "Q-Sun 590W ×120", industrial: "Q-Sun 590W ×2000" },
    { label: t("home.specRowInv"), residential: "GoodWe 35kW", ci: "GoodWe 80kW", industrial: t("home.dash") },
    { label: t("home.specRowBat"), residential: "QCL 10kWh", ci: "RochexEnergy 261kWh", industrial: "RochexEnergy 5MWh" },
    { label: t("home.specRowGrid"), residential: "On/Off Grid", ci: "400V 3φ", industrial: "HV 35kV" },
    { label: t("home.specRowMon"), residential: "WiFi/4G", ci: "EMS", industrial: "SCADA" },
    { label: t("home.specRowCycle"), residential: "6000+", ci: "8000+", industrial: "8000+" },
  ];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.specsOverline")} title={t("home.specsTitle")} center />
        <div style={{ overflowX: "auto", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: `1px solid ${BORDER}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr>
                {[t("home.specsHdrSpec"), t("home.specsHdrRes"), t("home.specsHdrCi"), t("home.specsHdrInd")].map((h, i) => (
                  <th key={h} style={{ padding: "14px 20px", backgroundColor: i === 0 ? SURFACE : "rgba(45,198,83,0.08)", borderBottom: `2px solid ${i === 0 ? BORDER : NSS_GREEN}`, color: i === 0 ? MUTED : DARK_GREEN, fontSize: 13, fontWeight: 700, textAlign: "left", letterSpacing: "0.035em", borderRight: `1px solid ${BORDER}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((row, i) => (
                <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? WHITE : SURFACE }}>
                  {[row.label, row.residential, row.ci, row.industrial].map((cell, j) => (
                    <td key={j} style={{ padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}`, color: j === 0 ? MUTED : TEXT, fontSize: 13, fontWeight: j === 0 ? 600 : 400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const { t } = useI18n();
  const p1 = useCounter(20, 2000, true);
  const p2 = useCounter(2, 2000, true);
  const p3 = useCounter(30, 2000, true);

  return (
    <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #F0F9FF 100%)", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 60 }}>
          {[
            { value: `${String(p1).padStart(2, "0")}+`, label: t("home.heroStatProjectsLbl"), Icon: TrendingUp },
            { value: `${String(p2).padStart(1, "0")}+`, label: t("home.statMw"), Icon: Zap },
            { value: `${String(p3).padStart(2, "0")}`, label: t("home.statLblWar"), Icon: Shield },
            { value: "24/7", label: t("home.statLblSupport"), Icon: Clock },
          ].map(({ value, label, Icon }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, backgroundColor: "rgba(45,198,83,0.12)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon size={24} color={NSS_GREEN} />
              </div>
              <div style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: TEXT, lineHeight: 1.06, fontVariantNumeric: "tabular-nums", overflowWrap: "anywhere", wordBreak: "break-word" }}>{value}</div>
              <div style={{ color: MUTED, fontSize: 14, marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 40 }}>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 12, letterSpacing: "var(--tracking-caps-md, 0.058em)", textTransform: "uppercase", marginBottom: 24 }}>{t("home.statsPartners")}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
            {["Q-Sun Solar", "GoodWe", "QCL Energy", "RochexEnergy"].map((partner) => (
              <div key={partner} style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 24px", color: TEXT, fontSize: 14, fontWeight: 700, letterSpacing: "0.03em", transition: "all 0.2s", cursor: "default", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = NSS_GREEN; e.currentTarget.style.color = DARK_GREEN; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT; }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const { t } = useI18n();
  const steps = [
    { icon: <Search size={24} />, num: "01", title: t("home.step01Title"), desc: t("home.step01Desc") },
    { icon: <PenTool size={24} />, num: "02", title: t("home.step02Title"), desc: t("home.step02Desc") },
    { icon: <Package size={24} />, num: "03", title: t("home.step03Title"), desc: t("home.step03Desc") },
    { icon: <Settings size={24} />, num: "04", title: t("home.step04Title"), desc: t("home.step04Desc") },
  ];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline={t("home.howOverline")} title={t("home.howTitle")} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0, position: "relative" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ padding: "24px 16px", position: "relative", textAlign: "center" }}>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: 44, right: 0, width: "50%", height: 2, background: `repeating-linear-gradient(90deg, ${NSS_GREEN} 0, ${NSS_GREEN} 6px, transparent 6px, transparent 12px)`, zIndex: 0 }} className="step-connector" />
              )}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
                  <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #2DC653, #1DA040)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 8px 24px rgba(45,198,83,0.35)" }}>
                    {step.icon}
                  </div>
                  <span style={{ position: "absolute", top: -4, right: -8, width: 20, height: 20, backgroundColor: WHITE, border: `1px solid ${NSS_GREEN}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: NSS_GREEN, fontSize: 9, fontWeight: 800 }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Onest', sans-serif" }}>{step.title}</h3>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .step-connector { display: none !important; } }`}</style>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", type: "" });

  return (
    <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5, #EFF6FF)" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.1) 0%, transparent 70%)", top: -200, right: -100, pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            {t("home.ctaTitlePrefix")}
            <span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("home.ctaTitleHighlight")}</span>
          </h2>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7 }}>{t("home.ctaSubtitle")}</p>
        </div>

        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 40, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
            {[
              { key: "name", label: t("home.fldName"), placeholder: t("home.phName"), type: "text" },
              { key: "phone", label: t("home.fldPhone"), placeholder: t("home.phPhone"), type: "tel" },
              { key: "email", label: t("home.fldEmail"), placeholder: t("home.phEmail"), type: "email" },
            ].map((field) => (
              <div key={field.key}>
                <label htmlFor={`home-cta-${field.key}`} style={{ color: MUTED, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>{field.label}</label>
                <input id={`home-cta-${field.key}`} type={field.type} placeholder={field.placeholder} value={formData[field.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  style={{ width: "100%", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", color: TEXT, fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
              </div>
            ))}
            <div>
              <label htmlFor="home-cta-type" style={{ color: MUTED, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>{t("home.fldType")}</label>
              <select id="home-cta-type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{ width: "100%", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", color: formData.type ? TEXT : MUTED, fontSize: 14, outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
                <option value="">{t("home.selTypePlaceholder")}</option>
                <option value="green">{t("home.selTypeGreen")}</option>
                <option value="commercial">{t("home.selTypeComm")}</option>
                <option value="industrial">{t("home.selTypeInd")}</option>
                <option value="utility">{t("home.selTypeUtil")}</option>
              </select>
            </div>
          </div>
          <button type="button" style={{ width: "100%", background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "14px", borderRadius: 8, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(45,198,83,0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(45,198,83,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,198,83,0.3)"; }}
          >
            {t("home.btnSubmitQuote")}
          </button>
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div style={{ backgroundColor: BG }}>
      <HeroSection />
      <ProductCategoriesSection />
      <WhyNSSSection />
      <SolutionsSection />
      <FeaturedProductsSection />
      <ProjectsSection />
      <SpecsComparisonSection />
      <StatsSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
