import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Eye, Shield, Sparkles } from "lucide-react";
import { useI18n } from "../../i18n";
import type { ProductDoc } from "../../data/products";
import { translateSpecLabel, warrantyForProduct, getCategoryLabel, getProductHighlight, getProductTags, formatProductPrice, hasProductPrice } from "../../lib/productHelpers";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProductDetailModal } from "./ProductDetailModal";

type ProductCardProps = {
  product: ProductDoc;
};

export function ProductCard({ product }: ProductCardProps) {
  const { t, locale } = useI18n();
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const priceLabel = formatProductPrice(product.price, t, locale);

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        className={`product-card group w-full min-[400px]:w-[calc(50%-12px)] min-[550px]:w-[250px] min-h-[450px] relative flex flex-col cursor-pointer${hovered ? " product-card--hover" : ""}${product.featured ? " product-card--featured" : ""}`}
        style={{ "--card-accent": product.color } as React.CSSProperties}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
      >
        <div className="product-card__quick-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            className="product-card__quick-btn"
            aria-label={t("common.details")}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <Eye size={16} />
          </button>
          <Link
            to="/contact"
            className="product-card__quick-btn"
            aria-label={t("common.quote")}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRight size={16} />
          </Link>
        </div>

        {product.image ? (
          <div className="product-card__media">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="product-card__img"
              loading="lazy"
            />
            <div className="product-card__media-shade" />

            <span className="product-card__category-pill">
              {getCategoryLabel(product, t)}
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
              {getCategoryLabel(product, t)}
            </span>
            {product.featured && (
              <span className="product-card__featured">
                <Sparkles size={11} />
                {t("common.recommended")}
              </span>
            )}
            <span className="product-card__power-badge product-card__power-badge--empty">
              {product.badge}
            </span>
          </div>
        )}

        <div className="product-card__body">
          <header className="product-card__header">
            <p className="product-card__subtitle">{getProductHighlight(product, t)}</p>
            <h3 className="product-card__title">{product.name}</h3>
          </header>

          <dl className="product-card__specs">
            {product.specs.slice(0, 2).map((spec) => (
              <div key={spec.label} className="product-card__spec">
                <dt>{translateSpecLabel(spec.label, t)}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="product-card__tags">
            {getProductTags(product, t).slice(0, 2).map((tag) => (
              <span key={tag} className="product-card__tag">
                {tag}
              </span>
            ))}
          </div>

          <footer className="product-card__footer">
            <div className="product-card__price-row">
              <span className={`product-card__price${hasProductPrice(product.price) ? "" : " product-card__price--request"}`}>
                {priceLabel}
              </span>
              <div className="product-card__warranty">
                <Shield size={14} />
                <span>{warrantyForProduct(product, t)}</span>
              </div>
            </div>
            <div className="product-card__actions">
              <button
                type="button"
                className="product-card__btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              >
                {t("common.details")}
              </button>
              <Link
                to="/contact"
                className="product-card__btn-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {t("common.quote")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <ProductDetailModal
        product={product}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <style>{`
        .product-card {
          --card-accent: #2DC653;
          border-radius: 22px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #D4DEE9;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, box-shadow 0.3s;
        }
        .product-card--hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--card-accent) 35%, #D4DEE9);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
        }
        .product-card:focus-visible {
          outline: 2px solid var(--card-accent);
          outline-offset: 2px;
        }

        .product-card__quick-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          display: flex;
          gap: 6px;
        }
        .product-card__quick-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          background: rgba(255, 255, 255, 0.92);
          color: #0F172A;
          cursor: pointer;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition: background 0.2s, color 0.2s, transform 0.2s;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.1);
        }
        .product-card__quick-btn svg {
          transition: opacity 0.2s;
        }
        .product-card__quick-btn:hover {
          background: var(--card-accent);
          color: #fff;
          transform: scale(1.05);
        }

        .product-card__media {
          position: relative;
          width: 100%;
          height: 200px;
          flex-shrink: 0;
          overflow: hidden;
          background: #fff;
          border-bottom: 1px solid #EEF2F8;
        }
        .product-card__media--empty {
          height: 120px;
        }
        .product-card__img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          padding: 12px;
          box-sizing: border-box;
          background: #fff;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .product-card--hover .product-card__img {
          transform: scale(1.04);
        }
        .product-card__media-shade {
          display: none;
        }

        .product-card__category-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 3;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 23, 42, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
          max-width: calc(100% - 90px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-card__featured {
          position: absolute;
          top: auto;
          bottom: 12px;
          right: 12px;
          left: auto;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #2DC653, #1A9E35);
          box-shadow: 0 4px 16px rgba(45, 198, 83, 0.38);
        }
        .product-card__power-badge {
          position: absolute;
          left: 12px;
          bottom: 12px;
          z-index: 3;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--card-accent);
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
        }
        .product-card__power-badge--empty {
          position: static;
          align-self: flex-start;
          margin: auto 12px 12px;
        }

        .product-card__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          padding: 14px 16px 16px;
          background: #fff;
        }
        .product-card__header {
          flex-shrink: 0;
          margin-bottom: 10px;
        }
        .product-card__subtitle {
          margin: 0 0 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--card-accent);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-card__title {
          margin: 0;
          font-family: 'Onest', sans-serif;
          font-size: 14px;
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
          display: flex;
          flex-direction: column;
          gap: 1px;
          flex-shrink: 0;
          margin: 0 0 10px;
          padding: 0;
          border-radius: 12px;
          border: 1px solid #D4DEE9;
          background: #D4DEE9;
          overflow: visible;
        }
        .product-card__spec {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          margin: 0;
          padding: 7px 10px;
          background: #F8FAFC;
          min-width: 0;
        }
        .product-card__spec:first-child {
          border-radius: 11px 11px 0 0;
          background: color-mix(in srgb, var(--card-accent) 7%, #fff);
        }
        .product-card__spec:last-child {
          border-radius: 0 0 11px 11px;
        }
        .product-card__spec:only-child {
          border-radius: 11px;
        }
        .product-card__spec dt {
          margin: 0;
          flex: 1 1 auto;
          min-width: 0;
          font-size: 9px;
          font-weight: 500;
          color: #64748B;
          overflow-wrap: anywhere;
        }
        .product-card__spec dd {
          margin: 0;
          flex: 0 1 auto;
          min-width: 0;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
          color: #0F172A;
          text-align: right;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .product-card__tags {
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          gap: 5px;
          margin-bottom: 10px;
          flex-shrink: 0;
        }
        .product-card__tag {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 600;
          line-height: 1.35;
          color: #64748B;
          background: #fff;
          border: 1px solid #E2E8F0;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .product-card__footer {
          margin-top: auto;
          flex-shrink: 0;
          padding-top: 12px;
          border-top: 1px solid #EEF2F8;
        }
        .product-card__price-row {
          margin-bottom: 10px;
        }
        .product-card__price {
          display: block;
          font-family: 'Onest', sans-serif;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .product-card__price--request {
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
        }
        .product-card__warranty {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 0;
          font-size: 10px;
          line-height: 1.45;
          color: #64748B;
        }
        .product-card__warranty svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: var(--card-accent);
        }
        .product-card__warranty span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-card__actions {
          display: flex;
          gap: 6px;
        }
        .product-card__btn-secondary,
        .product-card__btn-primary {
          flex: 1;
          padding: 10px 0;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
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
        }
        .product-card__btn-primary {
          flex: 1.1;
          color: #fff;
          background: linear-gradient(135deg, #2DC653, #1DA040);
          box-shadow: 0 4px 14px rgba(45, 198, 83, 0.28);
        }
        .product-card__btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(45, 198, 83, 0.38);
        }
      `}</style>
    </>
  );
}
