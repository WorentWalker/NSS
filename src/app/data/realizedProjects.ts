const DEYE_ASSET = "/assets/deye";
const PROJECTS_ASSET = "/assets/projects";

function deyeAsset(name: string): string {
  return `${DEYE_ASSET}/${encodeURIComponent(name)}`;
}

function projectAsset(folder: string, file: string): string {
  return `${PROJECTS_ASSET}/${folder}/${file}`;
}

export type ProjectMediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

export type RealizedProject = {
  id: string;
  categoryKey: string;
  titleKey: string;
  locationKey: string;
  descKey: string;
  tagKeys: [string, string, string];
  ctaKey: string;
  altPhotoKey: string;
  altVideoKey?: string;
  media: ProjectMediaItem[];
};

export const realizedProjects: RealizedProject[] = [
  {
    id: "kolodne",
    categoryKey: "home.projCatIndustrial",
    titleKey: "home.projectKolodneTitle",
    locationKey: "home.projectKolodneLocation",
    descKey: "home.projectKolodneDesc",
    tagKeys: ["home.projectKolodneTag0", "home.projectKolodneTag1", "home.projectKolodneTag2"],
    ctaKey: "home.projectKolodneCta",
    altPhotoKey: "home.projectKolodneAltPhoto",
    altVideoKey: "home.projectKolodneAltVideo",
    media: [
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.57.jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58 (1).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58 (2).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58 (3).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58 (4).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58 (5).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.58.jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.59 (1).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.59 (2).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.59 (3).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.54.59.jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.00 (1).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.00 (2).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.00.jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.01.jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.02 (1).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.02 (2).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.02 (3).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.02 (4).jpeg") },
      { type: "image", src: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.02.jpeg") },
      {
        type: "video",
        src: deyeAsset("WhatsApp Video 2026-06-05 at 21.55.01.mp4"),
        poster: deyeAsset("WhatsApp Image 2026-06-05 at 21.55.01.jpeg"),
      },
    ],
  },
  {
    id: "mamin-syr",
    categoryKey: "home.projCatAgro",
    titleKey: "home.projectMaminSyrTitle",
    locationKey: "home.projectMaminSyrLocation",
    descKey: "home.projectMaminSyrDesc",
    tagKeys: ["home.projectMaminSyrTag0", "home.projectMaminSyrTag1", "home.projectMaminSyrTag2"],
    ctaKey: "home.projectMaminSyrCta",
    altPhotoKey: "home.projectMaminSyrAltPhoto",
    media: [
      { type: "image", src: projectAsset("mamin-syr", "01.png") },
      { type: "image", src: projectAsset("mamin-syr", "02.png") },
      { type: "image", src: projectAsset("mamin-syr", "03.png") },
      { type: "image", src: projectAsset("mamin-syr", "04.png") },
      { type: "image", src: projectAsset("mamin-syr", "05.png") },
      { type: "image", src: projectAsset("mamin-syr", "06.png") },
    ],
  },
];
