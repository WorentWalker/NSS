import type { ProductDoc } from "../data/products";

export function translateSpecLabel(label: string, t: (key: string) => string): string {
  const m: Record<string, string> = {
    Vermogen: "productsPage.specPower",
    Rendement: "productsPage.specYield",
    Celtype: "productsPage.specCells",
    Spanning: "productsPage.specVoltage",
    Voc: "productsPage.specVoc",
    Isc: "productsPage.specIsc",
    Efficiëntie: "productsPage.specYield",
    MPPTs: "productsPage.specMppts",
    Bescherming: "productsPage.specProt",
    "DC Spanning": "productsPage.specDc",
    Gewicht: "productsPage.specWeight",
    Capaciteit: "productsPage.specCap",
    Stroom: "productsPage.specCurrent",
    Cycli: "productsPage.specCycles",
    Chemie: "productsPage.specChem",
    Energie: "productsPage.specEnergy",
    Koeling: "productsPage.specCool",
    Config: "productsPage.specCfg",
    "IP Niveau": "productsPage.specIp",
    Type: "productsPage.specTypeField",
    Fase: "productsPage.specPhase",
    Merk: "productsPage.specBrand",
    Net: "productsPage.specNet",
    Monitor: "productsPage.specMon",
    Afmetingen: "productsPage.specDims",
  };
  const path = m[label];
  return path ? t(path) : label;
}

export function warrantyForProduct(product: ProductDoc, t: (key: string) => string): string {
  if (!product.id) {
    return product.warranty;
  }
  if (product.id.startsWith("deye-")) {
    return t("productsPage.wStd");
  }
  switch (product.id) {
    case "qsun-620":
    case "qsun-720":
      return t("productsPage.wMat");
    case "gw35k":
    case "gw60k":
    case "gw80k":
      return t("productsPage.wStd");
    case "qcl-5":
    case "qcl-10":
      return t("productsPage.w10y");
    case "qcl-261":
      return t("productsPage.wCycles");
    case "rochex-261":
      return t("productsPage.wTuv");
    case "rochex-5mwh":
      return t("productsPage.wBnef");
    default:
      return product.warranty;
  }
}

export function getProductDescription(product: ProductDoc, t: (key: string) => string): string {
  const key = `productsPage.desc.${product.highlightKey}`;
  const translated = t(key);
  if (translated === key) {
    return t("productsPage.descFallback", {
      name: product.name,
      category: t(`productsPage.cats.${product.category}`),
    });
  }
  return translated;
}
