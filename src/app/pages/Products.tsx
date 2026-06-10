import { useState } from "react";
import { Link } from "react-router";
import { Filter, Sun, Zap } from "lucide-react";
import { useI18n } from "../i18n";
import { deyeProducts } from "../data/deyeProducts";
import type { ProductDoc } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";
import nssProduct1 from "figma:asset/2c5afeeeadc1c10b241a86ed9503d116ea92e554.png";
import nssProduct2 from "figma:asset/006bec9218f291152af2d36ed79cef9a6b00360a.png";
import nssProduct3 from "figma:asset/95fb35ccae0a21c77bf67f3116e76442824da4a1.png";
import nssEssImg from "figma:asset/ea61d0fe1462718c0219330a5459f4f6456c98e2.png";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const ACCENT = "#F97316";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

const nssProducts: ProductDoc[] = [
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
    highlightKey: "hiNtype",
    image: nssProduct2,
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
    highlightKey: "hiFlagship",
    featured: true,
    image: nssProduct2,
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
    highlightKey: "hiResCom",
    image: nssProduct1,
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
    highlightKey: "hiMediumBiz",
    image: nssProduct1,
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
    highlightKey: "hiTopPerf",
    featured: true,
    image: nssProduct1,
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
    highlightKey: "hiHomeStorage",
    image: nssProduct3,
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
    highlightKey: "hiPopular",
    featured: true,
    image: nssProduct3,
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
    highlightKey: "hiIndustrialUse",
    featured: true,
    image: nssProduct3,
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
    highlightKey: "hiEuCert",
    image: nssProduct3,
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
    highlightKey: "hiUtilityScale",
    featured: true,
    image: nssEssImg,
  },
];

const allProducts: ProductDoc[] = [...nssProducts, ...deyeProducts];

const CATEGORY_ORDER: ReadonlyArray<"all" | ProductDoc["category"]> = [
  "all",
  "solarPanels",
  "inverters",
  "batterySystems",
];

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

            <div className="flex flex-wrap gap-6">
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
