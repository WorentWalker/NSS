export type SpecRow = { label: string; value: string };

export type DbCategory = {
  id: string;
  name_uk: string;
  name_en: string;
  sort_order: number;
};

export type DbProduct = {
  id: string;
  category_id: string;
  name: string;
  badge: string;
  color: string;
  description_uk: string;
  description_en: string;
  highlight_uk: string;
  highlight_en: string;
  warranty: string;
  image: string | null;
  featured: number;
  specs: string;
  tags: string;
  sort_order: number;
  price: number | null;
};

export type ApiCategory = {
  id: string;
  nameUk: string;
  nameEn: string;
  sortOrder: number;
};

export type ApiProduct = {
  id: string;
  category: string;
  categoryName: string;
  name: string;
  badge: string;
  color: string;
  description: string;
  highlight: string;
  warranty: string;
  image?: string;
  featured: boolean;
  specs: SpecRow[];
  tags: string[];
  sortOrder: number;
  price: number | null;
};

export type ProductInput = {
  id?: string;
  categoryId: string;
  name: string;
  badge?: string;
  color?: string;
  descriptionUk?: string;
  descriptionEn?: string;
  highlightUk?: string;
  highlightEn?: string;
  warranty?: string;
  image?: string;
  featured?: boolean;
  specs?: SpecRow[];
  tags?: string[];
  sortOrder?: number;
  price?: number | null;
};

export type CategoryInput = {
  id?: string;
  nameUk: string;
  nameEn: string;
  sortOrder?: number;
};
