export type ProductCategory = string;

export type ProductDoc = {
  id: string;
  category: ProductCategory;
  categoryName?: string;
  name: string;
  badge: string;
  color: string;
  specs: { label: string; value: string }[];
  tagKeys?: string[];
  tags?: string[];
  warranty: string;
  highlightKey?: string;
  highlight?: string;
  description?: string;
  featured?: boolean;
  image?: string;
  /** Price in UAH; null/undefined = on request */
  price?: number | null;
};
