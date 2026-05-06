import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ArrowRight, Play, Zap, Battery, Shield, Wifi, Wrench, Building2,
  ChevronRight, MapPin, CheckCircle2, TrendingUp, Clock,
  Search, PenTool, Package, Settings, Sun
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
        <span style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{overline}</span>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
      </div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
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
}
function CategoryCard({ icon, title, subtitle, tag, specs, color, img }: CategoryCardProps) {
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
            <div style={{ color: TEXT, fontSize: 16, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{title}</div>
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
          Bekijk Producten <ArrowRight size={14} />
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
      <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{title}</h3>
      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ─── Product Showcase Card ────────────────────────────────────────────────────
interface ShowcaseCardProps {
  name: string; type: string; badge: string; color: string;
  specs: { label: string; value: string }[]; tags: string[]; warranty: string;
}
function ShowcaseCard({ name, type, badge, color, specs, tags, warranty }: ShowcaseCardProps) {
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
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, display: "block", marginBottom: 4 }}>{type}</span>
          <h3 style={{ color: TEXT, fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{name}</h3>
        </div>
        <span style={{ backgroundColor: `${color}18`, border: `1px solid ${color}55`, borderRadius: 6, padding: "4px 10px", color, fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>
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
          Offerte <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
interface ProjectCardProps { title: string; category: string; location: string; img: string; capacity: string; desc: string }
function ProjectCard({ title, category, location, img, capacity, desc }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${hovered ? NSS_GREEN + "55" : BORDER}`,
        borderRadius: 16, overflow: "hidden",
        transition: "all 0.3s",
        boxShadow: hovered ? "0 8px 40px rgba(45,198,83,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{ backgroundColor: NSS_GREEN, color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{category}</span>
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12 }}>
          <span style={{ backgroundColor: "rgba(255,255,255,0.9)", color: TEXT, padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{capacity}</span>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <MapPin size={12} color={NSS_GREEN} />
          <span style={{ color: MUTED, fontSize: 12 }}>{location}</span>
        </div>
        <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${NSS_GREEN}`, backgroundColor: "transparent", color: NSS_GREEN, padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          Bekijk Case <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const projects = useCounter(500, 2000, statsVisible);
  const mw = useCounter(50, 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", overflow: "hidden",
      background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 40%, #F0F9FF 100%)",
    }}>
      {/* Background decorations */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.10) 0%, transparent 70%)", top: -200, right: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.07) 0%, transparent 70%)", bottom: -150, left: -100, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(45,198,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,198,83,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: NSS_GREEN }} />
              <span style={{ color: DARK_GREEN, fontSize: 13, fontWeight: 600 }}>Zonne-energie Integrator — Nederland & Europa</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: TEXT, marginBottom: 24, letterSpacing: "-0.02em" }}>
              ENERGIE VAN<br />
              DE ZON MET{" "}
              <span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NSS</span>
            </h1>

            <p style={{ color: MUTED, fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
              Complete zonne-energiesystemen voor woningen en bedrijven. Panelen, omvormers en batterijopslag — ontworpen, geleverd en geïnstalleerd.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
              <Link to="/solutions"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,198,83,0.35)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(45,198,83,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,198,83,0.35)"; }}
              >
                Bekijk Oplossingen <ArrowRight size={16} />
              </Link>
              <Link to="/about"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: WHITE, border: `1px solid ${BORDER}`, color: TEXT, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = NSS_GREEN; e.currentTarget.style.color = NSS_GREEN; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT; }}
              >
                <Play size={16} /> Over NSS
              </Link>
            </div>

            <div ref={statsRef} style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[
                { icon: "⚡", value: `${projects}+`, label: "Projecten" },
                { icon: "☀️", value: `${mw} MW+`, label: "Geïnstalleerd" },
                { icon: "🔋", value: "261 kWh", label: "Max Opslag" },
              ].map((stat) => (
                <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ color: TEXT, fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
                    <div style={{ color: MUTED, fontSize: 12 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-image-col">
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(45,198,83,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
            <img
              src={nssProduct2}
              alt="NSS Solar Inverter"
              style={{ width: "100%", maxWidth: 420, height: "auto", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 40px rgba(45,198,83,0.2))" }}
            />
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(255,255,255,0.85)", borderTop: `1px solid ${BORDER}`, backdropFilter: "blur(10px)", padding: "12px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 60, alignItems: "center", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(3)].flatMap(() => ["Q-Sun Solar", "GoodWe", "QCL Energy", "RochexEnergy", "BNEF Tier 1", "TÜV Certified", "IEC 61215"]).map((item, i) => (
            <span key={i} style={{ color: MUTED, fontSize: 13, fontWeight: 600, letterSpacing: "0.03em" }}>
              <span style={{ color: NSS_GREEN, marginRight: 8 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-image-col { display: none !important; } }
      `}</style>
    </section>
  );
}

// ─── PRODUCT CATEGORIES ───────────────────────────────────────────────────────
function ProductCategoriesSection() {
  const categories = [
    { icon: <Sun size={28} />, title: "ZONNEPANELEN", subtitle: "Q-Sun Mercury Series 570–590W", tag: "Tot 590W/paneel", specs: ["22.8% Rendement", "30jr Garantie", "N-Type Bifacial", "Dubbelglas"], color: NSS_GREEN, img: "https://images.unsplash.com/photo-1651330712803-48d81811168f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
    { icon: <Zap size={28} />, title: "OMVORMERS", subtitle: "GoodWe SMT G2 Series", tag: "Tot 80kW output", specs: ["98.8% Efficiëntie", "35–80kW Range", "6 MPPTs", "IP66"], color: ACCENT, img: nssProduct1 },
    { icon: <Battery size={28} />, title: "BATTERIJOPSLAG", subtitle: "QCL Energy + RochexEnergy", tag: "5kWh tot 261kWh", specs: ["LFP Cellen", "Vloeistofkoeling", "6000+ Cycli", "4G Monitoring"], color: "#6366F1", img: nssProduct3 },
  ];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Onze Producten" title="COMPLEET ZONNESTELSEL" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {categories.map((cat) => <CategoryCard key={cat.title} {...cat} />)}
        </div>
      </div>
    </section>
  );
}

// ─── WHY NSS ───────────────────────────────────────────────────────────────────
function WhyNSSSection() {
  const features = [
    { icon: <Building2 size={24} />, title: "Tier-1 Fabrikanten", desc: "Q-Sun, GoodWe, RochexEnergy — bewezen kwaliteitspartners" },
    { icon: <Zap size={24} />, title: "Hoog Rendement", desc: "Tot 22.8% panelrendement, 98.8% omvormerefficiëntie" },
    { icon: <Battery size={24} />, title: "Slimme Opslag", desc: "LFP vloeistofgekoelde batterijen met 6000+ cyclus levensduur" },
    { icon: <Shield size={24} />, title: "30 Jaar Garantie", desc: "Materiaal- en vermogensgarantie op zonnepanelen" },
    { icon: <Wifi size={24} />, title: "Remote Monitoring", desc: "4G/WiFi EMS met cloud dashboard en realtime meldingen" },
    { icon: <Wrench size={24} />, title: "Volledige Installatie", desc: "Ontwerp, levering, installatie, inbedrijfstelling — turnkey" },
  ];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Onze Voordelen" title="WAAROM KIEZEN VOOR NSS" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map((feat) => <FeatureCard key={feat.title} {...feat} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS ────────────────────────────────────────────────────────────────
function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("residential");
  const tabs = [
    { id: "residential", label: "Particulier" },
    { id: "ci", label: "Zakelijk & Industrie" },
    { id: "utility", label: "Utiliteitsschaal" },
  ];

  const content: Record<string, { img: string; title: string; desc: string; package: string[] }> = {
    residential: {
      img: "https://images.unsplash.com/photo-1771479755055-6a305f50845e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Thuiszonnesystemen",
      desc: "Complete thuisoplossingen met zonnepanelen, slimme omvormers en batterijback-up. Bereik energieonafhankelijkheid en verlaag uw elektriciteitsrekening met tot 90%.",
      package: ["10 panelen × 590W = 5.9kW", "GoodWe 35kW Omvormer", "QCL 10kWh Batterij", "WiFi/4G Monitoring"],
    },
    ci: {
      img: "https://images.unsplash.com/photo-1726866492047-7f9516558c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Zakelijke Zonne-oplossingen",
      desc: "Grootschalige systemen voor fabrieken, magazijnen en kantoorgebouwen. Piekverdeling, TOU-arbitrage, noodstroom en zero-export opties.",
      package: ["Q-Sun 590W × 120 panelen", "GoodWe 80kW SMT G2", "RochexEnergy 261kWh Kast", "EMS Dashboard"],
    },
    utility: {
      img: "https://images.unsplash.com/photo-1585735140520-c51cbbebe03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Utiliteitsschaal Projecten",
      desc: "Megawatt-schaal zonneparken en netgekoppelde BESS-oplossingen. Containergebaseerde 5MWh-systemen met SCADA-monitoring en HV-netaansluiting.",
      package: ["Q-Sun 590W × 2000+ panelen", "Meerdere 5MWh Containers", "35kV Netaansluiting", "SCADA Monitoring"],
    },
  };

  const active = content[activeTab];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Toepassingen" title="OPLOSSINGEN VOOR ELKE BEHOEFTE" center />
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 24px", borderRadius: 8, border: `1px solid ${activeTab === tab.id ? NSS_GREEN : BORDER}`, backgroundColor: activeTab === tab.id ? "rgba(45,198,83,0.1)" : WHITE, color: activeTab === tab.id ? DARK_GREEN : MUTED, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="solutions-grid">
          <div style={{ borderRadius: 16, overflow: "hidden", height: 380, position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
            <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 16 }}>{active.title}</h3>
            <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>{active.desc}</p>
            <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Systeempakket</div>
              {active.package.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={16} color={NSS_GREEN} />
                  <span style={{ color: TEXT, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/solutions" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,198,83,0.3)" }}>
              Meer Informatie <ArrowRight size={14} />
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
  const products = [
    { name: "Q-Sun Mercury QN-590HT-06", type: "Zonnepaneel", badge: "590W", color: NSS_GREEN, specs: [{ label: "Rendement", value: "22.8%" }, { label: "Celtype", value: "N-Type" }, { label: "Voc", value: "52.16V" }, { label: "Max Spanning", value: "1500VDC" }], tags: ["Bifacial", "Dubbelglas", "IEC 61215"], warranty: "15jr materiaal / 30jr vermogen" },
    { name: "GoodWe GW80K-SMT", type: "String Omvormer", badge: "80kW", color: ACCENT, specs: [{ label: "Efficiëntie", value: "98.6%" }, { label: "MPPTs", value: "6" }, { label: "DC Spanning", value: "1100V" }, { label: "Bescherming", value: "IP66" }], tags: ["Driefasig", "AFCI", "RS485/WiFi"], warranty: "5jr standaard" },
    { name: "QCL QCL125KW-261KWH", type: "Batterijkast", badge: "261kWh", color: "#6366F1", specs: [{ label: "Vermogen", value: "125kW" }, { label: "Spanning", value: "DC 832V" }, { label: "Koeling", value: "Vloeistof" }, { label: "Gewicht", value: "2500kg" }], tags: ["IP54", "4G Monitor", "On/Off Grid"], warranty: "8000+ cycli" },
    { name: "RochexEnergy 125kW/261kWh", type: "ESS Kast", badge: "261kWh", color: "#8B5CF6", specs: [{ label: "Energie", value: "261kWh" }, { label: "Vermogen", value: "125kW" }, { label: "Config", value: "1P52S" }, { label: "IP Niveau", value: "IP54" }], tags: ["TÜV CE", "LFP-314", "Vloeistofkoel."], warranty: "TÜV Gecertificeerd" },
  ];

  return (
    <section style={{ backgroundColor: SURFACE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Uitgelichte Producten" title="VLAGGENSCHIP APPARATUUR" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {products.map((p) => <ShowcaseCard key={p.name} {...p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${NSS_GREEN}`, color: NSS_GREEN, padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all 0.2s", backgroundColor: WHITE }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(45,198,83,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = WHITE; }}
          >
            Alle Producten Bekijken <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  const projects = [
    { title: "480kW / 964kWh — Nederland", category: "Zakelijk", location: "Nederland 🇳🇱", img: "https://images.unsplash.com/photo-1674252281682-2eec258cfa30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", capacity: "480kW / 964kWh", desc: "Commercieel dakzonne-project met batterijopslag" },
    { title: "125kW / 261kWh — Slowakije", category: "Industrieel", location: "Slowakije 🇸🇰", img: "https://images.unsplash.com/photo-1726866492047-7f9516558c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", capacity: "125kW / 261kWh", desc: "Industrieel zonnepanelensysteem met RochexEnergy ESS" },
    { title: "Woning Project — Nederland", category: "Particulier", location: "Nederland 🇳🇱", img: "https://images.unsplash.com/photo-1641760078754-a2d10d7ca990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", capacity: "10kWh", desc: "Residentieel systeem met batterijopslag en monitoring" },
  ];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Casestudies" title="ONZE PROJECTEN" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SPECS COMPARISON ─────────────────────────────────────────────────────────
function SpecsComparisonSection() {
  const specs = [
    { label: "Zonnepanelen", residential: "Q-Sun 570W ×8", ci: "Q-Sun 590W ×120", industrial: "Q-Sun 590W ×2000" },
    { label: "Omvormer", residential: "GoodWe 35kW", ci: "GoodWe 80kW", industrial: "—" },
    { label: "Batterij", residential: "QCL 10kWh", ci: "RochexEnergy 261kWh", industrial: "RochexEnergy 5MWh" },
    { label: "Nettype", residential: "On/Off Grid", ci: "Driefasig 400V", industrial: "HV 35kV" },
    { label: "Monitoring", residential: "WiFi/4G App", ci: "EMS Dashboard", industrial: "SCADA" },
    { label: "Cycluslevensduur", residential: "6000+", ci: "8000+", industrial: "8000+" },
  ];

  return (
    <section style={{ backgroundColor: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Technische Data" title="SYSTEEMSPECIFICATIES" center />
        <div style={{ overflowX: "auto", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: `1px solid ${BORDER}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr>
                {["Specificatie", "Particulier 10kWh", "Zakelijk 261kWh", "Industrieel 5MWh"].map((h, i) => (
                  <th key={h} style={{ padding: "14px 20px", backgroundColor: i === 0 ? SURFACE : "rgba(45,198,83,0.08)", borderBottom: `2px solid ${i === 0 ? BORDER : NSS_GREEN}`, color: i === 0 ? MUTED : DARK_GREEN, fontSize: 13, fontWeight: 700, textAlign: "left", letterSpacing: "0.04em", borderRight: `1px solid ${BORDER}` }}>
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
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const p1 = useCounter(500, 2500, visible);
  const p2 = useCounter(50, 2500, visible);
  const p3 = useCounter(30, 2500, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #F0F9FF 100%)", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 60 }}>
          {[
            { value: `${p1}+`, label: "Geïnstalleerde Projecten", Icon: TrendingUp },
            { value: `${p2} MW`, label: "Totaal Geïnstalleerd", Icon: Zap },
            { value: `${p3} Jaar`, label: "Paneel Garantie", Icon: Shield },
            { value: "24/7", label: "Support Beschikbaar", Icon: Clock },
          ].map(({ value, label, Icon }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, backgroundColor: "rgba(45,198,83,0.12)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon size={24} color={NSS_GREEN} />
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: TEXT, lineHeight: 1 }}>{value}</div>
              <div style={{ color: MUTED, fontSize: 14, marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 40 }}>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Vertrouwde Partners</p>
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
  const steps = [
    { icon: <Search size={24} />, num: "01", title: "Gratis Consult", desc: "Locatiebeoordeling en energie-audit voor uw specifieke behoeften" },
    { icon: <PenTool size={24} />, num: "02", title: "Maatwerk Ontwerp", desc: "Systeemontwerp met 3D-visualisatie en financiële analyse" },
    { icon: <Package size={24} />, num: "03", title: "Apparatuurlevering", desc: "Premium Tier-1 apparatuurlevering met volledige documentatie" },
    { icon: <Settings size={24} />, num: "04", title: "Installatie & Inbedrijfstelling", desc: "Professionele installatie, netaansluiting en monitoring" },
  ];

  return (
    <section style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle overline="Proces" title="UW WEG NAAR ZONNE-ENERGIE" center />
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
                <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{step.title}</h3>
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
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", type: "" });

  return (
    <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5, #EFF6FF)" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.1) 0%, transparent 70%)", top: -200, right: -100, pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            KLAAR VOOR{" "}
            <span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZONNE-ENERGIE?</span>
          </h2>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7 }}>Ontvang een gratis energie-audit en aangepast systeemontwerp voor uw project</p>
        </div>

        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 40, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
            {[
              { key: "name", label: "Volledige Naam", placeholder: "Jan de Vries", type: "text" },
              { key: "phone", label: "Telefoonnummer", placeholder: "+31 6 XX XX XX XX", type: "tel" },
              { key: "email", label: "E-mailadres", placeholder: "jan@bedrijf.nl", type: "email" },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ color: MUTED, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} value={formData[field.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  style={{ width: "100%", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", color: TEXT, fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
              </div>
            ))}
            <div>
              <label style={{ color: MUTED, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Systeemtype</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{ width: "100%", backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", color: formData.type ? TEXT : MUTED, fontSize: 14, outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
                <option value="">Selecteer type</option>
                <option value="residential">Particulier (5–20kW)</option>
                <option value="ci">Zakelijk (20–500kW)</option>
                <option value="utility">Utiliteit (500kW+)</option>
              </select>
            </div>
          </div>
          <button style={{ width: "100%", background: "linear-gradient(135deg, #2DC653, #1DA040)", color: "#fff", padding: "14px", borderRadius: 8, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(45,198,83,0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(45,198,83,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,198,83,0.3)"; }}
          >
            Gratis Offerte Aanvragen →
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
