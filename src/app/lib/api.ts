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
  specs: { label: string; value: string }[];
  tags: string[];
  sortOrder: number;
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
  specs?: { label: string; value: string }[];
  tags?: string[];
  sortOrder?: number;
};

export type CategoryInput = {
  id?: string;
  nameUk: string;
  nameEn: string;
  sortOrder?: number;
};

const ADMIN_KEY = "nss_admin_password";

export async function adminSeed(force = false): Promise<{ count: number; skipped?: boolean }> {
  const res = await fetch(`/api/admin/seed${force ? "?force=true" : ""}`, {
    method: "POST",
    headers: adminHeaders(),
  });
  let data: { error?: string; skipped?: boolean; catalogSize?: number; count?: number } = {};
  try {
    data = await res.json();
  } catch {
    if (res.status === 504) {
      throw new Error("Таймаут сервера. Спробуйте ще раз або запустіть npm run db:seed локально.");
    }
    throw new Error(`Сервер повернув ${res.status} без JSON — перевірте /api/health`);
  }
  if (!res.ok) {
    throw new Error(data.error || `Помилка сервера (${res.status})`);
  }
  if (data.skipped) {
    return { count: data.catalogSize ?? 0, skipped: true };
  }
  return { count: data.count ?? 0 };
}

export async function adminLogin(password: string): Promise<void> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (res.status === 401) {
    throw new Error("wrong_password");
  }

  if (!res.ok) {
    let message = "server_error";
    try {
      const data = await res.json();
      if (data.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
}

export function getAdminPassword(): string | null {
  return sessionStorage.getItem(ADMIN_KEY);
}

export function setAdminPassword(password: string) {
  sessionStorage.setItem(ADMIN_KEY, password);
}

export function clearAdminPassword() {
  sessionStorage.removeItem(ADMIN_KEY);
}

function adminHeaders(): HeadersInit {
  const password = getAdminPassword();
  return password ? { Authorization: `Bearer ${password}` } : {};
}

export async function fetchProducts(lang: string): Promise<ApiProduct[]> {
  const res = await fetch(`/api/products?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function adminFetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch("/api/admin/products", { headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function adminCreateProduct(input: ProductInput): Promise<ApiProduct> {
  const res = await fetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to create product");
  }
  return res.json();
}

export async function adminUpdateProduct(id: string, input: ProductInput): Promise<ApiProduct> {
  const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to update product");
  }
  return res.json();
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to delete product");
  }
}

export async function adminFetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch("/api/admin/categories", { headers: adminHeaders() });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function adminCreateCategory(input: CategoryInput): Promise<ApiCategory> {
  const res = await fetch("/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to create category");
  }
  return res.json();
}

export async function adminDeleteCategory(id: string): Promise<void> {
  const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to delete category");
  }
}

export function apiProductToDoc(product: ApiProduct): import("../data/products").ProductDoc {
  return {
    id: product.id,
    category: product.category,
    categoryName: product.categoryName,
    name: product.name,
    badge: product.badge,
    color: product.color,
    specs: product.specs,
    tags: product.tags,
    warranty: product.warranty,
    highlight: product.highlight,
    description: product.description,
    featured: product.featured,
    image: product.image,
  };
}
