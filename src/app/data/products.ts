export type ProductCategory = "solarPanels" | "inverters" | "batterySystems";

export type ProductDoc = {
  id: string;
  category: ProductCategory;
  name: string;
  badge: string;
  color: string;
  specs: { label: string; value: string }[];
  tagKeys: string[];
  warranty: string;
  highlightKey: string;
  featured?: boolean;
  image?: string;
};
