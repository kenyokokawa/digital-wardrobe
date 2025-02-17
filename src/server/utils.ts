import { type ClothingItem } from "~/consts/types";

export const isItemDemo = (item: ClothingItem): boolean => {
  return Boolean(item.userId?.startsWith("demo_"));
};
