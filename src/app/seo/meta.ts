export type SeoPayload = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogLocale?: string;
  ogLocaleAlternate?: string;
  robots?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data?: Record<string, unknown>) {
  const id = "nss-json-ld";
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  const script = existing ?? document.createElement("script");
  script.id = id;
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://nss.energy";
}

export function applySeo(payload: SeoPayload) {
  document.title = payload.title;

  upsertMeta("name", "description", payload.description);
  if (payload.keywords) upsertMeta("name", "keywords", payload.keywords);
  if (payload.robots) upsertMeta("name", "robots", payload.robots);

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:title", payload.title);
  upsertMeta("property", "og:description", payload.description);
  if (payload.canonical) upsertMeta("property", "og:url", payload.canonical);
  if (payload.ogImage) upsertMeta("property", "og:image", payload.ogImage);
  if (payload.ogLocale) upsertMeta("property", "og:locale", payload.ogLocale);
  if (payload.ogLocaleAlternate) {
    upsertMeta("property", "og:locale:alternate", payload.ogLocaleAlternate);
  }

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", payload.title);
  upsertMeta("name", "twitter:description", payload.description);
  if (payload.ogImage) upsertMeta("name", "twitter:image", payload.ogImage);

  if (payload.canonical) upsertLink("canonical", payload.canonical);

  upsertJsonLd(payload.jsonLd);
}
