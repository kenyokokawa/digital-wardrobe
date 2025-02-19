export type CategoryItem = {
  id: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: CategoryItem[];
};

export const DEFAULT_CATEGORY_GROUPS: CategorySection[] = [
  // {
  //   id: "headwear",
  //   label: "Headwear",
  //   items: ["hat", "scarf", "glasses", "sunglasses"].map((id) => ({
  //     id,
  //   })),
  // },
  {
    id: "outerwear",
    label: "Outerwear",
    items: ["outerwear", "coat", "jacket"].map((id) => ({
      id,
    })),
  },
  {
    id: "tops",
    label: "Tops",
    items: [
      "top",
      "t-shirt",
      "long sleeve t-shirt",
      "sweater",
      "sweatshirt",
    ].map((id) => ({
      id,
    })),
  },
  {
    id: "accessories",
    label: "Accessories",
    items: ["belt", "jewelry", "watch", "bag"].map((id) => ({
      id,
    })),
  },
  {
    id: "bottoms",
    label: "Bottoms",
    items: ["bottom", "pants", "shorts", "skirt"].map((id) => ({
      id,
    })),
  },
  {
    id: "shoes",
    label: "Shoes",
    items: ["shoes", "sneakers", "boots", "sandals"].map((id) => ({
      id,
    })),
  },
];

export const CATEGORY_ITEMS: CategoryItem[] = Object.values(
  DEFAULT_CATEGORY_GROUPS.flatMap((group) => group.items),
);
