import { useState } from "react";
import { Link } from "react-router";
import { Filter, Sun, Zap } from "lucide-react";
import { useI18n } from "../i18n";
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
    category: "solarPanels" as const,
    name: "Q-Sun QN-570HT-06",
    badge: "570W",
    color: NSS_GREEN,
    specs: [
      { label: "Vermogen", value: "570W" },
      { label: "Rendement", value: "22.1%" },
      { label: "Celtype", value: "N-Type" },
      { label: "Spanning", value: "1500VDC" },
    ],
    tagKeys: ["home.tagBifacial", "home.tagDoubleGlass", "home.tagIEC"],
    warranty: "15jr materiaal / 30jr vermogen",
    highlight: "N-Type Mono 16BB",
    highlightKey: "hiNtype",
  },
  {
    id: "qsun-590",
    category: "solarPanels" as const,
    name: "Q-Sun QN-590HT-06",
    badge: "590W",
    color: NSS_GREEN,
    specs: [
      { label: "Vermogen", value: "590W" },
      { label: "Rendement", value: "22.8%" },
      { label: "Voc", value: "52.16V" },
      { label: "Isc", value: "14.32A" },
    ],
    tagKeys: ["home.tagBifacial", "home.tagDoubleGlass", "home.tagIso"],
    warranty: "15jr materiaal / 30jr vermogen",
    highlight: "Vlaggenschip Model",
    highlightKey: "hiFlagship",
    featured: true,
  },
  {
    id: "gw35k",
    category: "inverters" as const,
    name: "GoodWe GW35K-SMT-L-G20",
    badge: "35kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "35kW" },
      { label: "Efficiëntie", value: "98.7%" },
      { label: "MPPTs", value: "4" },
      { label: "Bescherming", value: "IP66" },
    ],
    tagKeys: ["home.tagThreePhase", "productsPage.ptagStringInv", "productsPage.ptagWifi4g"],
    warranty: "5jr standaard",
    highlight: "Particulier & Zakelijk",
    highlightKey: "hiResCom",
  },
  {
    id: "gw60k",
    category: "inverters" as const,
    name: "GoodWe GW60K-SMT-G20",
    badge: "60kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "60kW" },
      { label: "Efficiëntie", value: "98.5%" },
      { label: "MPPTs", value: "6" },
      { label: "DC Spanning", value: "1100V" },
    ],
    tagKeys: ["home.tagThreePhase", "productsPage.ptagAfciOpt", "productsPage.ptagRs485"],
    warranty: "5jr standaard",
    highlight: "Medium Zakelijk",
    highlightKey: "hiMediumBiz",
  },
  {
    id: "gw80k",
    category: "inverters" as const,
    name: "GoodWe GW80K-SMT",
    badge: "80kW",
    color: ACCENT,
    specs: [
      { label: "Vermogen", value: "80kW" },
      { label: "Efficiëntie", value: "98.6%" },
      { label: "MPPTs", value: "6" },
      { label: "Gewicht", value: "64kg" },
    ],
    tagKeys: ["home.tagIp66", "productsPage.ptagSpdType2", "productsPage.ptagLan4g"],
    warranty: "5jr standaard",
    highlight: "Top Prestatie",
    highlightKey: "hiTopPerf",
    featured: true,
  },
  {
    id: "qcl-5",
    category: "batterySystems" as const,
    name: "QCL QCL-51.2-100",
    badge: "5kWh",
    color: "#6366F1",
    specs: [
      { label: "Capaciteit", value: "5.12kWh" },
      { label: "Spanning", value: "51.2V" },
      { label: "Cycli", value: "6000+" },
      { label: "Chemie", value: "LFP" },
    ],
    tagKeys: ["productsPage.ptagRackMount", "productsPage.ptagBms", "productsPage.ptagWifiMon"],
    warranty: "10jr prestatie",
    highlight: "Thuisopslag",
    highlightKey: "hiHomeStorage",
  },
  {
    id: "qcl-10",
    category: "batterySystems" as const,
    name: "QCL QCL-51.2-200",
    badge: "10kWh",
    color: "#6366F1",
    specs: [
      { label: "Capaciteit", value: "10.24kWh" },
      { label: "Spanning", value: "51.2V" },
      { label: "Stroom", value: "200Ah" },
      { label: "Bescherming", value: "IP55" },
    ],
    tagKeys: ["home.tagLfp", "productsPage.ptagStackable", "home.tag4g"],
    warranty: "10jr prestatie",
    highlight: "Populaire Keuze",
    highlightKey: "hiPopular",
    featured: true,
  },
  {
    id: "qcl-261",
    category: "batterySystems" as const,
    name: "QCL QCL125KW-261KWH",
    badge: "261kWh",
    color: "#6366F1",
    specs: [
      { label: "Vermogen", value: "125kW" },
      { label: "Spanning", value: "DC 832V" },
      { label: "Koeling", value: "Vloeistof" },
      { label: "Gewicht", value: "2500kg" },
    ],
    tagKeys: ["home.tagIp54", "home.tagLfp", "home.tagThreePhase"],
    warranty: "8000+ cycli",
    highlight: "Industrieel",
    highlightKey: "hiIndustrialUse",
    featured: true,
  },
  {
    id: "rochex-261",
    category: "batterySystems" as const,
    name: "RochexEnergy 125kW/261kWh",
    badge: "261kWh",
    color: "#8B5CF6",
    specs: [
      { label: "Energie", value: "261kWh" },
      { label: "Vermogen", value: "125kW" },
      { label: "Config", value: "1P52S" },
      { label: "IP Niveau", value: "IP54" },
    ],
    tagKeys: ["home.tagTuvCe", "home.tagLfp", "productsPage.ptagLiquidCoolShort"],
    warranty: "TÜV Gecertificeerd",
    highlight: "EU Gecertificeerd",
    highlightKey: "hiEuCert",
  },
  {
    id: "rochex-5mwh",
    category: "batterySystems" as const,
    name: "RochexEnergy 5MWh Container",
    badge: "5MWh",
    color: "#8B5CF6",
    specs: [
      { label: "Energie", value: "5MWh" },
      { label: "Type", value: "Container" },
      { label: "Net", value: "35kV" },
      { label: "Monitor", value: "SCADA" },
    ],
    tagKeys: ["productsPage.hiUtilityScale", "productsPage.ptagTuvBadge", "productsPage.ptagBnefBadge"],
    warranty: "BNEF Tier 1",
    highlight: "Utiliteitsschaal",
    highlightKey: "hiUtilityScale",
    featured: true,
  },
];

type ProdDoc = (typeof allProducts)[number];

const CATEGORY_ORDER: ReadonlyArray<"all" | ProdDoc["category"]> = [
  "all",
  "solarPanels",
  "inverters",
  "batterySystems",
];

function translateSpecLabel(label: string, t: (key: string) => string): string {
  const m: Record<string, string> = {
    Vermogen: "productsPage.specPower",
    Rendement: "productsPage.specYield",
    Celtype: "productsPage.specCells",
    Spanning: "productsPage.specVoltage",
    Voc: "productsPage.specVoc",
    Isc: "productsPage.specIsc",
    Efficiëntie: "productsPage.specYield",
    MPPTs: "productsPage.specMppts",
    Bescherming: "productsPage.specProt",
    "DC Spanning": "productsPage.specDc",
    Gewicht: "productsPage.specWeight",
    Capaciteit: "productsPage.specCap",
    Stroom: "productsPage.specCurrent",
    Cycli: "productsPage.specCycles",
    Chemie: "productsPage.specChem",
    Energie: "productsPage.specEnergy",
    Koeling: "productsPage.specCool",
    Config: "productsPage.specCfg",
    "IP Niveau": "productsPage.specIp",
    Type: "productsPage.specTypeField",
    Net: "productsPage.specNet",
    Monitor: "productsPage.specMon",
  };
  const path = m[label];
  return path ? t(path) : label;
}

function warrantyForProduct(product: ProdDoc, t: (key: string) => string): string {
  switch (product.id) {
    case "qsun-570":
    case "qsun-590":
      return t("productsPage.wMat");
    case "gw35k":
    case "gw60k":
    case "gw80k":
      return t("productsPage.wStd");
    case "qcl-5":
    case "qcl-10":
      return t("productsPage.w10y");
    case "qcl-261":
      return t("productsPage.wCycles");
    case "rochex-261":
      return t("productsPage.wTuv");
    case "rochex-5mwh":
      return t("productsPage.wBnef");
    default:
      return product.warranty;
  }
}

function ProductCard({ product }: { product: ProdDoc }) {
  const { t } = useI18n();
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
          {t("common.recommended")}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase",
            color: product.color, display: "block", marginBottom: 6,
          }}>
            {t(`productsPage.cats.${product.category}`)}
          </span>
          <h3 style={{ color: TEXT, fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>{product.name}</h3>
          <p style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{t(`productsPage.${product.highlightKey}`)}</p>
        </div>
        <span style={{
          backgroundColor: `${product.color}18`,
          border: `1px solid ${product.color}55`,
          borderRadius: 8,
          padding: "6px 12px",
          color: product.color,
          fontSize: 14,
          fontWeight: 800,
          textAlign: "right",
          flexShrink: 0,
          marginLeft: 8,
          alignSelf: "flex-start",
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
            <div style={{ color: MUTED, fontSize: 10, marginBottom: 2 }}>{translateSpecLabel(spec.label, t)}</div>
            <div style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}>{spec.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {product.tagKeys.map((tagKey) => (
          <span key={tagKey} style={{
            padding: "3px 8px",
            backgroundColor: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 4,
            color: MUTED,
            fontSize: 11,
            fontWeight: 500,
          }}>
            {t(tagKey)}
          </span>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
        <div style={{ color: MUTED, fontSize: 11, marginBottom: 12 }}>⚙ {warrantyForProduct(product, t)}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" style={{
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
            {t("common.details")}
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
            {t("common.quote")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_ORDER)[number]>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const slug = `${p.name} ${t(`productsPage.cats.${p.category}`)}`.toLowerCase();
    const matchesSearch =
      slug.includes(searchTerm.toLowerCase())
      || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", paddingTop: 72 }}>
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
              <Link to="/" style={{ color: MUTED, textDecoration: "none" }}>{t("nav.home")}</Link>
              {" / "}
              <span style={{ color: NSS_GREEN }}>{t("productsPage.breadcrumbProducts")}</span>
            </span>
          </div>
          <h1 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: TEXT, marginBottom: 12 }}>
            {t("productsPage.headingLead")}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("productsPage.headingAccent")}</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 500 }}>
            {t("productsPage.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
            <img src={nssProduct1} alt={t("productsPage.altInv")} style={{ height: 120, width: "auto", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))", borderRadius: 8 }} />
            <img src={nssProduct3} alt={t("productsPage.altInvPro")} style={{ height: 120, width: "auto", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))", borderRadius: 8 }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 32 }} className="products-layout">
          <aside style={{ width: 220, flexShrink: 0 }} className="products-sidebar">
            <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <h3 style={{ color: TEXT, fontSize: 13, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Filter size={14} color={NSS_GREEN} /> {t("common.filter")}
              </h3>
              {CATEGORY_ORDER.map((cat) => (
                <button
                  key={cat}
                  type="button"
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
                  <span>{t(`productsPage.cats.${cat}`)}</span>
                  <span style={{ fontSize: 12 }}>
                    {cat === "all" ? allProducts.length : allProducts.filter((p) => p.category === cat).length}
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
              <p style={{ color: TEXT, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{t("productsPage.filterHelpTitle")}</p>
              <p style={{ color: MUTED, fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>{t("productsPage.filterHelpDesc")}</p>
              <Link to="/contact" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                boxSizing: "border-box",
                background: "linear-gradient(135deg, #2DC653, #1DA040)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.35,
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(45,198,83,0.3)",
                transition: "all 0.2s",
              }}>
                {t("common.freeQuote")}
              </Link>
            </div>
          </aside>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <input
                type="text"
                placeholder={t("productsPage.searchPlaceholder")}
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
              {t("productsPage.resultsCount", { count: filtered.length })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>
                <Sun size={40} color={BORDER} style={{ margin: "0 auto 16px" }} />
                <p>{t("productsPage.empty")}</p>
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
