export type CategoryItem = {
  id: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: CategoryItem[];
  isVisible: boolean;
};

export const DEFAULT_CATEGORY_GROUPS: CategorySection[] = [
  {
    id: "headwear",
    label: "Headwear",
    items: ["hat", "scarf", "glasses", "sunglasses"].map((id) => ({
      id,
    })),
    isVisible: false,
  },
  {
    id: "outerwear",
    label: "Outerwear",
    items: ["outerwear", "coat", "jacket"].map((id) => ({
      id,
    })),
    isVisible: true,
  },
  {
    id: "tops",
    label: "Tops",
    items: [
      "top",
      "shirt",
      "t-shirt",
      "long sleeve t-shirt",
      "sweater",
      "sweatshirt",
    ].map((id) => ({
      id,
    })),
    isVisible: true,
  },
  {
    id: "accessories",
    label: "Accessories",
    items: ["belt", "jewelry", "watch", "bag"].map((id) => ({
      id,
    })),
    isVisible: false,
  },
  {
    id: "bottoms",
    label: "Bottoms",
    items: ["bottom", "pants", "shorts", "skirt"].map((id) => ({
      id,
    })),
    isVisible: true,
  },
  {
    id: "shoes",
    label: "Shoes",
    items: ["shoes", "sneakers", "boots", "sandals"].map((id) => ({
      id,
    })),
    isVisible: true,
  },
];

export const CATEGORY_ITEMS: CategoryItem[] = Object.values(
  DEFAULT_CATEGORY_GROUPS.flatMap((group) => group.items),
);
