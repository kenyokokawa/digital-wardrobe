export type CategoryItem = {
  id: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: CategoryItem[];
  isVisible: boolean;
};

export const DEFAULT_SECTIONS: CategorySection[] = [
  {
    id: "headwear",
    label: "Headwear",
    items: ["hat", "scarf", "glasses", "sunglasses", "beanie"].map((id) => ({
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
      "cardigan",
      "jumper",
      "hoodie",
      "polo",
    ].map((id) => ({
      id,
    })),
    isVisible: true,
  },
  {
    id: "accessories",
    label: "Accessories",
    items: ["belt", "jewelry", "watch", "bag", "tote bag"].map((id) => ({
      id,
    })),
    isVisible: false,
  },
  {
    id: "bottoms",
    label: "Bottoms",
    items: ["bottom", "pants", "shorts", "skirt", "jeans"].map((id) => ({
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

export const DEFAULT_CATEGORIES: CategoryItem[] = Object.values(
  DEFAULT_SECTIONS.flatMap((section) => section.items),
);
