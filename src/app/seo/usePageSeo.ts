import { useEffect } from "react";
import { useLocation } from "react-router";
import { useI18n } from "../i18n";
import { applySeo, getSiteUrl } from "./meta";

export type SeoPageKey = "home" | "products" | "solutions" | "about" | "contact" | "admin";

const PAGE_BY_PATH: Record<string, SeoPageKey> = {
  "/": "home",
  "/products": "products",
  "/solutions": "solutions",
  "/about": "about",
  "/contact": "contact",
  "/admin": "admin",
};

function buildTitle(pageKey: SeoPageKey, t: (key: string) => string): string {
  const siteName = t("seo.siteName");
  const siteTagline = t("seo.siteTagline");
  const slogan = t(`seo.pages.${pageKey}.slogan`);

  if (pageKey === "home") {
    return `${siteName} — ${siteTagline} | ${slogan}`;
  }

  const pageTitle = t(`seo.pages.${pageKey}.title`);
  return `${pageTitle} — ${slogan} | ${siteName} — ${siteTagline}`;
}

function buildOrganizationJsonLd(t: (key: string) => string, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${t("seo.siteName")} — ${t("seo.siteTagline")}`,
    url: siteUrl,
    logo: `${siteUrl}/assets/marstek/front.png`,
    description: t("seo.defaultDescription"),
    email: "info@nss.energy",
    areaServed: ["UA", "EU"],
    sameAs: [],
  };
}

export function usePageSeo(pageKey?: SeoPageKey) {
  const { pathname } = useLocation();
  const { t, locale } = useI18n();

  const resolvedKey = pageKey ?? PAGE_BY_PATH[pathname] ?? "home";

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const path = resolvedKey === "home" ? "" : `/${resolvedKey === "admin" ? "admin" : resolvedKey}`;
    const canonical = `${siteUrl}${path}`;
    const ogImage = `${siteUrl}/assets/marstek/front.png`;
    const noindex = resolvedKey === "admin";

    applySeo({
      title: buildTitle(resolvedKey, t),
      description: t(`seo.pages.${resolvedKey}.description`),
      keywords: t("seo.keywords"),
      canonical: noindex ? undefined : canonical,
      ogImage,
      ogLocale: locale === "uk" ? "uk_UA" : "en_US",
      ogLocaleAlternate: locale === "uk" ? "en_US" : "uk_UA",
      robots: noindex ? "noindex, nofollow" : "index, follow",
      jsonLd: resolvedKey === "home" && !noindex
        ? buildOrganizationJsonLd(t, siteUrl)
        : undefined,
    });
  }, [resolvedKey, locale, t]);
}
