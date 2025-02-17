import { type ClothingItem } from "~/types/global";

export const isItemDemo = (item: ClothingItem): boolean => {
  return Boolean(item.userId?.startsWith("demo_"));
};
