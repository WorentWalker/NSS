import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Filter, Sun, Zap, Battery, ArrowRight } from "lucide-react";
import nssProduct1 from "figma:asset/2c5afeeeadc1c10b241a86ed9503d116ea92e554.png";
import nssProduct3 from "figma:asset/95fb35ccae0a21c77bf67f3116e76442824da4a1.png";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const ACCENT = "#F97316";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

const allProducts = [
  {
    id: "qsun-570",
    category: "Zonnepanelen",
    name: "Q-Sun QN-570HT-06",
    badge: "570W",
    color: NSS_GREEN,
    specs: [
      { label: "Vermogen", value: "570W" },
      { label: "Rendement", value: "22.1%" },
      { label: "Celtype", value: "N-Type" },
      { label: "Spanning", value: "1500VDC" },
    ],
    tags: ["Bifacial", "Dubbelglas", "IEC 61215"],
    warranty: "15jr materiaal / 30jr vermogen",
    highlight: "N-Type Mono 16BB",
  },
  {
    id: "qsun-590",
    category: "Zonnepanelen",
    name: "Q-Sun QN-590HT-06",
    badge: "590W",
    color: NSS_GREEN,
    specs: [
      { label: "Vermogen", value: "590W" },
      { label: "Rendement", value: "22.8%" },
      { label: "Voc", value: "52.16V" },
      { label: "Isc", value: "14.32A" },
    ],
    tags: ["Bifacial", "Dubbelglas", "ISO 9001"],
    warranty: "15jr materiaal / 30jr vermogen",
    highlight: "Vlaggenschip Model",
    featured: true,
  },
  {
    id: "gw35k",
    category: "Omvormers",
    name: "GoodWe GW35K-SMT-L-G20",
    badge: "35kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "35kW" },
      { label: "Efficiëntie", value: "98.7%" },
      { label: "MPPTs", value: "4" },
      { label: "Bescherming", value: "IP66" },
    ],
    tags: ["Driefasig", "String Omvormer", "WiFi/4G"],
    warranty: "5jr standaard",
    highlight: "Particulier & Zakelijk",
  },
  {
    id: "gw60k",
    category: "Omvormers",
    name: "GoodWe GW60K-SMT-G20",
    badge: "60kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "60kW" },
      { label: "Efficiëntie", value: "98.5%" },
      { label: "MPPTs", value: "6" },
      { label: "DC Spanning", value: "1100V" },
    ],
    tags: ["Driefasig", "AFCI Optie", "RS485"],
    warranty: "5jr standaard",
    highlight: "Medium Zakelijk",
  },
  {
    id: "gw80k",
    category: "Omvormers",
    name: "GoodWe GW80K-SMT",
    badge: "80kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "80kW" },
      { label: "Efficiëntie", value: "98.6%" },
      { label: "MPPTs", value: "6" },
      { label: "Gewicht", value: "64kg" },
    ],
    tags: ["IP66", "Type II SPD", "LAN/4G"],
    warranty: "5jr standaard",
    highlight: "Top Prestatie",
    featured: true,
  },
  {
    id: "qcl-5",
    category: "Batterijsystemen",
    name: "QCL QCL-51.2-100",
    badge: "5kWh",
    color: "#6366F1",
    specs: [
      { label: "Capaciteit", value: "5.12kWh" },
      { label: "Spanning", value: "51.2V" },
      { label: "Cycli", value: "6000+" },
      { label: "Chemie", value: "LFP" },
    ],
    tags: ["Rack Mount", "BMS", "WiFi Monitor"],
    warranty: "10jr prestatie",
    highlight: "Thuisopslag",
  },
  {
    id: "qcl-10",
    category: "Batterijsystemen",
    name: "QCL QCL-51.2-200",
    badge: "10kWh",
    color: "#6366F1",
    specs: [
      { label: "Capaciteit", value: "10.24kWh" },
      { label: "Spanning", value: "51.2V" },
      { label: "Stroom", value: "200Ah" },
      { label: "Bescherming", value: "IP55" },
    ],
    tags: ["LFP", "Stapelbaar", "4G Monitor"],
    warranty: "10jr prestatie",
    highlight: "Populaire Keuze",
    featured: true,
  },
  {
    id: "qcl-261",
    category: "Batterijsystemen",
    name: "QCL QCL125KW-261KWH",
    badge: "261kWh",
    color: "#6366F1",
    specs: [
      { label: "Vermogen", value: "125kW" },
      { label: "Spanning", value: "DC 832V" },
      { label: "Koeling", value: "Vloeistof" },
      { label: "Gewicht", value: "2500kg" },
    ],
    tags: ["IP54", "LFP-314", "Driefasig"],
    warranty: "8000+ cycli",
    highlight: "Industrieel",
    featured: true,
  },
  {
    id: "rochex-261",
    category: "Batterijsystemen",
    name: "RochexEnergy 125kW/261kWh",
    badge: "261kWh",
    color: "#8B5CF6",
    specs: [
      { label: "Energie", value: "261kWh" },
      { label: "Vermogen", value: "125kW" },
      { label: "Config", value: "1P52S" },
      { label: "IP Niveau", value: "IP54" },
    ],
    tags: ["TÜV CE", "LFP-314", "Vloeistofkoel."],
    warranty: "TÜV Gecertificeerd",
    highlight: "EU Gecertificeerd",
  },
  {
    id: "rochex-5mwh",
    category: "Batterijsystemen",
    name: "RochexEnergy 5MWh Container",
    badge: "5MWh",
    color: "#8B5CF6",
    specs: [
      { label: "Energie", value: "5MWh" },
      { label: "Type", value: "Container" },
      { label: "Net", value: "35kV" },
      { label: "Monitor", value: "SCADA" },
    ],
    tags: ["Utiliteitsschaal", "TÜV", "BNEF Tier 1"],
    warranty: "BNEF Tier 1",
    highlight: "Utiliteitsschaal",
    featured: true,
  },
];

const categories = ["Alle", "Zonnepanelen", "Omvormers", "Batterijsystemen"];
const categoryMap: Record<string, string> = {
  "Alle": "All",
  "Zonnepanelen": "Zonnepanelen",
  "Omvormers": "Omvormers",
  "Batterijsystemen": "Batterijsystemen",
};

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${hovered ? product.color + "66" : BORDER}`,
        borderRadius: 16,
        padding: 24,
        transition: "all 0.3s",
        boxShadow: hovered ? `0 8px 32px ${product.color}18` : "0 2px 8px rgba(0,0,0,0.05)",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {product.featured && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          backgroundColor: NSS_GREEN,
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          padding: "4px 12px",
          borderRadius: "0 16px 0 8px",
          letterSpacing: "0.05em",
        }}>
          AANBEVOLEN
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: product.color, display: "block", marginBottom: 6,
          }}>
            {product.category}
          </span>
          <h3 style={{ color: TEXT, fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>{product.name}</h3>
          <p style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{product.highlight}</p>
        </div>
        <span style={{
          backgroundColor: `${product.color}18`,
          border: `1px solid ${product.color}55`,
          borderRadius: 8,
          padding: "6px 12px",
          color: product.color,
          fontSize: 14,
          fontWeight: 800,
          whiteSpace: "nowrap",
          flexShrink: 0,
          marginLeft: 8,
        }}>
          {product.badge}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {product.specs.map((spec) => (
          <div key={spec.label} style={{
            backgroundColor: SURFACE,
            borderRadius: 8,
            padding: "8px 12px",
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ color: MUTED, fontSize: 10, marginBottom: 2 }}>{spec.label}</div>
            <div style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}>{spec.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {product.tags.map((tag) => (
          <span key={tag} style={{
            padding: "3px 8px",
            backgroundColor: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 4,
            color: MUTED,
            fontSize: 11,
            fontWeight: 500,
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
        <div style={{ color: MUTED, fontSize: 11, marginBottom: 12 }}>⚙ {product.warranty}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            flex: 1,
            padding: "9px 0",
            backgroundColor: "transparent",
            border: `1px solid ${BORDER}`,
            borderRadius: 6,
            color: MUTED,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEXT; e.currentTarget.style.color = TEXT; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}
          >
            Details
          </button>
          <Link to="/contact" style={{
            flex: 1,
            padding: "9px 0",
            background: `linear-gradient(135deg, #2DC653, #1DA040)`,
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 10px rgba(45,198,83,0.25)",
          }}>
            Offerte
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchesCategory = activeCategory === "Alle" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", paddingTop: 72 }}>
      {/* Header */}
      <div style={{
        padding: "60px 24px 40px",
        background: "linear-gradient(135deg, #F0FDF4, #ECFDF5, #EFF6FF)",
        borderBottom: `1px solid ${BORDER}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ color: MUTED, fontSize: 13 }}>
              <Link to="/" style={{ color: MUTED, textDecoration: "none" }}>Home</Link>
              {" / "}
              <span style={{ color: NSS_GREEN }}>Producten</span>
            </span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: TEXT, marginBottom: 12 }}>
            Product{" "}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Catalogus</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 500 }}>
            Premium zonnepanelen, omvormers en batterijopslag van Tier-1 fabrikanten.
          </p>

          {/* Product images showcase */}
          <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
            <img src={nssProduct1} alt="NSS Omvormer" style={{ height: 120, width: "auto", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))", borderRadius: 8 }} />
            <img src={nssProduct3} alt="NSS Pro Omvormer" style={{ height: 120, width: "auto", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))", borderRadius: 8 }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 32 }} className="products-layout">
          {/* Sidebar */}
          <aside style={{ width: 220, flexShrink: 0 }} className="products-sidebar">
            <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <h3 style={{ color: TEXT, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Filter size={14} color={NSS_GREEN} /> Filter
              </h3>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${activeCategory === cat ? "rgba(45,198,83,0.4)" : "transparent"}`,
                    backgroundColor: activeCategory === cat ? "rgba(45,198,83,0.08)" : "transparent",
                    color: activeCategory === cat ? DARK_GREEN : MUTED,
                    fontSize: 14,
                    fontWeight: activeCategory === cat ? 700 : 400,
                    cursor: "pointer",
                    marginBottom: 4,
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  <span>{cat}</span>
                  <span style={{ fontSize: 12 }}>
                    {cat === "Alle" ? allProducts.length : allProducts.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(45,198,83,0.08), rgba(45,198,83,0.04))",
              border: "1px solid rgba(45,198,83,0.2)",
              borderRadius: 12,
              padding: 20,
            }}>
              <Zap size={20} color={NSS_GREEN} style={{ marginBottom: 10 }} />
              <p style={{ color: TEXT, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Hulp nodig?</p>
              <p style={{ color: MUTED, fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>Onze engineers helpen u het juiste systeem te kiezen.</p>
              <Link to="/contact" style={{
                display: "block",
                textAlign: "center",
                background: "linear-gradient(135deg, #2DC653, #1DA040)",
                color: "#fff",
                padding: "10px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(45,198,83,0.25)",
              }}>
                Advies Aanvragen
              </Link>
            </div>
          </aside>

          {/* Main */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <input
                type="text"
                placeholder="Producten zoeken..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: TEXT,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
                onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                onBlur={(e) => (e.target.style.borderColor = BORDER)}
              />
            </div>

            <div style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>
              <span style={{ color: TEXT, fontWeight: 600 }}>{filtered.length}</span> producten gevonden
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>
                <Sun size={40} color={BORDER} style={{ margin: "0 auto 16px" }} />
                <p>Geen producten gevonden.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .products-layout { flex-direction: column !important; }
          .products-sidebar { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
