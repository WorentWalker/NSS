import { Link } from "react-router";
import { ArrowRight, Shield, Sparkles, Tag } from "lucide-react";
import { useI18n } from "../../i18n";
import type { ProductDoc } from "../../data/products";
import {
  getProductDescription,
  translateSpecLabel,
  warrantyForProduct,
  getCategoryLabel,
  getProductHighlight,
  getProductTags,
} from "../../lib/productHelpers";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

type ProductDetailModalProps = {
  product: ProductDoc | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  const { t } = useI18n();

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="product-detail-modal max-h-[92vh] overflow-y-auto border-[#D4DEE9] bg-white p-0 sm:max-w-[860px] gap-0"
        style={{ "--modal-accent": product.color } as React.CSSProperties}
      >
        <div className="product-detail-modal__layout">
          <div className="product-detail-modal__media">
            {product.image ? (
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="product-detail-modal__img"
              />
            ) : (
              <div className="product-detail-modal__img-placeholder" />
            )}
            <span className="product-detail-modal__badge">{product.badge}</span>
            {product.featured && (
              <span className="product-detail-modal__featured">
                <Sparkles size={12} />
                {t("common.recommended")}
              </span>
            )}
          </div>

          <div className="product-detail-modal__body">
            <DialogTitle className="product-detail-modal__title">{product.name}</DialogTitle>
            <DialogDescription asChild>
              <div>
                <p className="product-detail-modal__meta">
                  <span>{getCategoryLabel(product, t)}</span>
                  {getProductHighlight(product, t) && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{getProductHighlight(product, t)}</span>
                    </>
                  )}
                </p>
                <p className="product-detail-modal__sku">
                  {t("productsPage.modalSku")}: {product.id}
                </p>
              </div>
            </DialogDescription>

            <p className="product-detail-modal__desc">{getProductDescription(product, t)}</p>

            <dl className="product-detail-modal__specs">
              {product.specs.map((spec) => (
                <div key={spec.label} className="product-detail-modal__spec">
                  <dt>{translateSpecLabel(spec.label, t)}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="product-detail-modal__tags">
              <Tag size={14} className="product-detail-modal__tags-icon" />
              {getProductTags(product, t).map((tag) => (
                <span key={tag} className="product-detail-modal__tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="product-detail-modal__warranty">
              <Shield size={16} />
              <span>{warrantyForProduct(product, t)}</span>
            </div>

            <div className="product-detail-modal__actions">
              <Link to="/contact" className="product-detail-modal__cta">
                {t("common.freeQuote")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          .product-detail-modal {
            --modal-accent: #2DC653;
          }
          .product-detail-modal__layout {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 640px) {
            .product-detail-modal__layout {
              grid-template-columns: 280px 1fr;
            }
          }
          .product-detail-modal__media {
            position: relative;
            min-height: 220px;
            background:
              radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--modal-accent) 16%, #fff) 0%, transparent 58%),
              linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%);
            border-bottom: 1px solid #EEF2F8;
          }
          @media (min-width: 640px) {
            .product-detail-modal__media {
              min-height: 100%;
              border-bottom: none;
              border-right: 1px solid #EEF2F8;
            }
          }
          .product-detail-modal__img {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 220px;
            object-fit: contain;
            object-position: center;
            padding: 24px;
            box-sizing: border-box;
          }
          .product-detail-modal__img-placeholder {
            min-height: 220px;
          }
          .product-detail-modal__badge {
            position: absolute;
            left: 16px;
            bottom: 16px;
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--modal-accent);
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
          }
          .product-detail-modal__featured {
            position: absolute;
            top: 16px;
            right: 16px;
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
          }
          .product-detail-modal__body {
            padding: 24px 24px 28px;
          }
          .product-detail-modal__title {
            margin: 0 0 8px;
            font-family: 'Onest', sans-serif;
            font-size: 22px;
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: -0.02em;
            color: #0F172A;
            text-align: left;
          }
          .product-detail-modal__meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin: 0 0 6px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--modal-accent);
          }
          .product-detail-modal__sku {
            margin: 0 0 16px;
            font-size: 12px;
            color: #64748B;
          }
          .product-detail-modal__desc {
            margin: 0 0 20px;
            font-size: 14px;
            line-height: 1.65;
            color: #475569;
          }
          .product-detail-modal__specs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1px;
            margin: 0 0 18px;
            padding: 0;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid #D4DEE9;
            background: #D4DEE9;
          }
          .product-detail-modal__spec {
            margin: 0;
            padding: 12px 14px;
            background: #F8FAFC;
          }
          .product-detail-modal__spec:first-child {
            background: color-mix(in srgb, var(--modal-accent) 7%, #fff);
          }
          .product-detail-modal__spec dt {
            margin: 0 0 4px;
            font-size: 10px;
            font-weight: 500;
            color: #64748B;
          }
          .product-detail-modal__spec dd {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
            color: #0F172A;
          }
          .product-detail-modal__tags {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-bottom: 18px;
          }
          .product-detail-modal__tags-icon {
            color: #94A3B8;
            flex-shrink: 0;
          }
          .product-detail-modal__tag {
            padding: 5px 11px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            color: #64748B;
            background: #fff;
            border: 1px solid #E2E8F0;
          }
          .product-detail-modal__warranty {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 20px;
            padding: 12px 14px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            color: #475569;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
          }
          .product-detail-modal__warranty svg {
            flex-shrink: 0;
            margin-top: 1px;
            color: var(--modal-accent);
          }
          .product-detail-modal__actions {
            display: flex;
            gap: 10px;
          }
          .product-detail-modal__cta {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            text-decoration: none;
            background: linear-gradient(135deg, #2DC653, #1DA040);
            box-shadow: 0 4px 16px rgba(45, 198, 83, 0.32);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .product-detail-modal__cta:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 22px rgba(45, 198, 83, 0.42);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
