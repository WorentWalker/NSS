import { usePageSeo } from "./usePageSeo";

/** Updates document title and meta tags from the current route + locale. */
export function PageSeo() {
  usePageSeo();
  return null;
}
