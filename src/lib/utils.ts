import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CategoryItem, DEFAULT_SECTIONS } from "~/consts/consts";
import { type ClothingItem } from "~/consts/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isItemDemo = (item: ClothingItem): boolean => {
  return (
    item.userId === process.env.NEXT_PUBLIC_DEFAULT_DEMO_USER_ID ||
    Boolean(item.userId?.startsWith("demo_"))
  );
};

export const buildDefaultSectionsFromCategories = (
  categories: CategoryItem[],
) => {
  const sections = DEFAULT_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      categories.some((c) => c.id === item.id),
    ),
  })).filter((section) => section.items.length > 0);
  return sections;
};
