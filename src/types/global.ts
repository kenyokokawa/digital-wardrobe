export enum ClothingCategory {
  TOPS = "top",
  BOTTOMS = "bottom",
  OUTERWEAR = "shoes",
}

export type ClothingItem = {
  userId: string;
  imgUrl: string;
  id: number;
  name: string | null;
  brand: string | null;
  category: string | null;
};
