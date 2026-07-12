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
        lineHeight: 1.4,
        marginBottom: 10,
        maxWidth: "100%",
      }}
    >
      {t(`seo.pages.${page}.slogan`)}
    </p>
  );
}
