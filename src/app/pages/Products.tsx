import { useState } from "react";
import { Link } from "react-router";
import { Filter, Sun, Zap, Shield, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "../i18n";
import { deyeProducts } from "../data/deyeProducts";
import type { ProductDoc } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
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
    Fase: "productsPage.specPhase",
    Merk: "productsPage.specBrand",
    Net: "productsPage.specNet",
    Monitor: "productsPage.specMon",
  };
  const path = m[label];
  return path ? t(path) : label;
}

function warrantyForProduct(product: ProductDoc, t: (key: string) => string): string {
  if (product.id.startsWith("deye-")) {
    return t("productsPage.wStd");
  }
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

function ProductCard({ product }: { product: ProductDoc }) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const accentSoft = `${product.color}14`;
  const accentBorder = `${product.color}33`;

  return (
    <article
      className={`product-card${hovered ? " product-card--hover" : ""}${product.featured ? " product-card--featured" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--card-accent": product.color } as React.CSSProperties}
    >
      {product.image ? (
        <div className="product-card__media">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="product-card__img"
            loading="lazy"
          />
          <div className="product-card__media-shade" />
          <div className="product-card__media-fade" />

          <span className="product-card__category-pill">
            {t(`productsPage.cats.${product.category}`)}
          </span>

          {product.featured && (
            <span className="product-card__featured">
              <Sparkles size={11} />
              {t("common.recommended")}
            </span>
          )}

          <span className="product-card__power-badge">{product.badge}</span>
        </div>
      ) : (
        <div className="product-card__media product-card__media--empty">
          <span className="product-card__category-pill">
            {t(`productsPage.cats.${product.category}`)}
          </span>
          {product.featured && (
            <span className="product-card__featured">
              <Sparkles size={11} />
              {t("common.recommended")}
            </span>
          )}
        </div>
      )}

      <div className="product-card__body">
        {!product.image && (
          <span className="product-card__inline-badge">{product.badge}</span>
        )}

        <header className="product-card__header">
          {!product.image && product.featured && (
            <span className="product-card__featured product-card__featured--inline">
              <Sparkles size={11} />
              {t("common.recommended")}
            </span>
          )}
          {product.image && (
            <p className="product-card__subtitle">{t(`productsPage.${product.highlightKey}`)}</p>
          )}
          <h3 className="product-card__title">{product.name}</h3>
          {!product.image && (
            <p className="product-card__subtitle">{t(`productsPage.${product.highlightKey}`)}</p>
          )}
        </header>

        <dl className="product-card__specs">
          {product.specs.map((spec) => (
            <div key={spec.label} className="product-card__spec">
              <dt>{translateSpecLabel(spec.label, t)}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="product-card__tags">
          {product.tagKeys.slice(0, 3).map((tagKey) => (
            <span key={tagKey} className="product-card__tag">
              {t(tagKey)}
            </span>
          ))}
        </div>

        <footer className="product-card__footer">
          <div className="product-card__warranty">
            <Shield size={14} />
            <span>{warrantyForProduct(product, t)}</span>
          </div>
          <div className="product-card__actions">
            <button type="button" className="product-card__btn-secondary">
              {t("common.details")}
            </button>
            <Link to="/contact" className="product-card__btn-primary">
              {t("common.quote")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </footer>
      </div>
    </article>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
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
        .product-card {
          --card-accent: #2DC653;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: 22px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #D4DEE9;
          box-shadow: none;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s;
        }
        .product-card--featured {
          box-shadow: none;
        }
        .product-card--hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--card-accent) 35%, #D4DEE9);
          box-shadow: none;
        }

        .product-card__media {
          position: relative;
          width: 100%;
          height: 214px;
          flex-shrink: 0;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--card-accent) 16%, #fff) 0%, transparent 58%),
            linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%);
        }
        .product-card__media--empty {
          height: 72px;
        }
        .product-card__img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .product-card--hover .product-card__img {
          transform: scale(1.06);
        }
        .product-card__media-shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(15, 23, 42, 0.12) 0%, transparent 28%),
            linear-gradient(0deg, rgba(15, 23, 42, 0.18) 0%, transparent 42%);
        }
        .product-card__media-fade {
          display: none;
        }

        .product-card__category-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 23, 42, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
        }
        .product-card__featured {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #2DC653, #1A9E35);
          box-shadow: 0 4px 16px rgba(45, 198, 83, 0.38);
        }
        .product-card__featured--inline {
          position: static;
          align-self: flex-start;
          margin-bottom: 10px;
        }
        .product-card__power-badge {
          position: absolute;
          left: 14px;
          bottom: 14px;
          z-index: 3;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--card-accent);
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          box-shadow: none;
        }

        .product-card__body {
          position: relative;
          z-index: 2;
          margin-top: 0;
          padding: 14px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 0;
          box-shadow: none;
        }
        .product-card__inline-badge {
          align-self: flex-start;
          margin-bottom: 10px;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          color: var(--card-accent);
          background: color-mix(in srgb, var(--card-accent) 10%, #fff);
          border: 1px solid color-mix(in srgb, var(--card-accent) 22%, #D4DEE9);
        }
        .product-card__header {
          margin-bottom: 14px;
        }
        .product-card__subtitle {
          margin: 4px 0 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--card-accent);
        }
        .product-card__title {
          margin: 0 0 4px;
          font-family: 'Onest', sans-serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: #0F172A;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-card__specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          margin: 0 0 14px;
          padding: 0;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #D4DEE9;
          background: #D4DEE9;
        }
        .product-card__spec {
          margin: 0;
          padding: 11px 12px;
          background: #F8FAFC;
        }
        .product-card__spec:first-child {
          background: color-mix(in srgb, var(--card-accent) 7%, #fff);
        }
        .product-card__spec dt {
          margin: 0 0 3px;
          font-size: 10px;
          font-weight: 500;
          color: #64748B;
        }
        .product-card__spec dd {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
        }

        .product-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .product-card__tag {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
          color: #64748B;
          background: #fff;
          border: 1px solid #E2E8F0;
        }

        .product-card__footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #EEF2F8;
        }
        .product-card__warranty {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 14px;
          font-size: 11px;
          line-height: 1.5;
          color: #64748B;
        }
        .product-card__warranty svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: var(--card-accent);
        }
        .product-card__actions {
          display: flex;
          gap: 8px;
        }
        .product-card__btn-secondary,
        .product-card__btn-primary {
          flex: 1;
          padding: 11px 0;
          border-radius: 11px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: none;
        }
        .product-card__btn-secondary {
          background: #F8FAFC;
          border: 1px solid #D4DEE9;
          color: #0F172A;
        }
        .product-card__btn-secondary:hover {
          background: #fff;
          border-color: #94A3B8;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
        }
        .product-card__btn-primary {
          flex: 1.15;
          color: #fff;
          background: linear-gradient(135deg, #2DC653, #1DA040);
          box-shadow: 0 4px 16px rgba(45, 198, 83, 0.32);
        }
        .product-card__btn-primary:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #34d058, #22a847);
          box-shadow: 0 8px 22px rgba(45, 198, 83, 0.42);
        }

        @media (max-width: 768px) {
          .products-layout { flex-direction: column !important; }
          .products-sidebar { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
