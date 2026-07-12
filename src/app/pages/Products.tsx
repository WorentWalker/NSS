import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Filter, Sun, Zap } from "lucide-react";
import { useI18n } from "../i18n";
import type { ProductDoc } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";
import { apiProductToDoc, fetchCategories, fetchProducts, type ApiCategory } from "../lib/api";
import nssProduct1 from "figma:asset/2c5afeeeadc1c10b241a86ed9503d116ea92e554.png";
import nssProduct3 from "figma:asset/95fb35ccae0a21c77bf67f3116e76442824da4a1.png";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

export function Products() {
  const { t, locale } = useI18n();
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [apiProducts, apiCategories] = await Promise.all([
          fetchProducts(locale),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProducts(apiProducts.map(apiProductToDoc));
          setCategories(apiCategories);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [locale]);

  const categoryOptions = useMemo(() => {
    const items = categories.map((c) => ({
      id: c.id,
      label: locale === "uk" ? c.nameUk : c.nameEn,
      count: products.filter((p) => p.category === c.id).length,
    }));
    return [{ id: "all", label: t("productsPage.cats.all"), count: products.length }, ...items];
  }, [categories, products, locale, t]);

  const filtered = products.filter((p) => {
    const categoryLabel = p.categoryName || t(`productsPage.cats.${p.category}`);
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const slug = `${p.name} ${categoryLabel}`.toLowerCase();
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
              {categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${activeCategory === cat.id ? "rgba(45,198,83,0.4)" : "transparent"}`,
                    backgroundColor: activeCategory === cat.id ? "rgba(45,198,83,0.08)" : "transparent",
                    color: activeCategory === cat.id ? DARK_GREEN : MUTED,
                    fontSize: 14,
                    fontWeight: activeCategory === cat.id ? 700 : 400,
                    cursor: "pointer",
                    marginBottom: 4,
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  <span>{cat.label}</span>
                  <span style={{ fontSize: 12 }}>{cat.count}</span>
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
              {loading ? "..." : t("productsPage.resultsCount", { count: filtered.length })}
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>Завантаження...</div>
            ) : (
              <div className="flex flex-wrap gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
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
