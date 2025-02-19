import { type ClothingItem } from "~/consts/types";

export const isItemDemo = (item: ClothingItem): boolean => {
  return (
    item.userId === process.env.NEXT_PUBLIC_DEFAULT_DEMO_USER_ID ||
    Boolean(item.userId?.startsWith("demo_"))
  );
};
