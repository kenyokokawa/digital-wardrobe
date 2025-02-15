export enum ClothingCategory {
  TOPS = "top",
  BOTTOMS = "bottom",
  OUTERWEAR = "shoes",
}

export type ClothingItem = {
  imgUrl: string;
  id: number;
  name: string | null;
  brand: string | null;
  category: string | null;
};
