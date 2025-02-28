export type ClothingItem = {
  userId: string;
  imgUrl: string;
  id: number;
  name: string | null;
  brand: string | null;
  category: string | null;
};

export type SavedFit = {
  id: number;
  userId: string;
  name: string;
  itemIds: number[];
  createdAt: Date;
  updatedAt: Date | null;
  itemsData?: ClothingItem[];
};

// UI
export type GridImageSize = "S" | "M" | "L";
