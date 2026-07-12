import { useI18n } from "../i18n";
import type { SeoPageKey } from "../seo/usePageSeo";

type PageSloganProps = {
  page: SeoPageKey;
};

export function PageSlogan({ page }: PageSloganProps) {
  const { t } = useI18n();

  return (
    <p
      style={{
        color: "#1A9E35",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {t(`seo.pages.${page}.slogan`)}
    </p>
  );
}
