"use client";
import { CATEGORIES } from "~/consts/consts";
import { type ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import CategoryRow from "./CategoryRow";
const MainGrid = ({ items }: { items: ClothingItem[] }) => {
  const { categories } = useMainGrid();
  return (
    <div className="flex flex-col gap-3 sm:gap-8">
      {items.filter((item) => !item.category).length > 0 && (
        <CategoryRow
          category="Uncategorized"
          items={items.filter((item) => !item.category)}
        />
      )}
      {CATEGORIES.map((category) => {
        if (categories.includes(category.name)) {
          return (
            <CategoryRow
              key={category.name}
              category={category.label}
              items={items.filter((item) => item.category === category.name)}
            />
          );
        }
      })}
      {categories.length === 0 && (
        <div className="flex justify-center p-4">
          <p className="text-center font-chakra text-xl font-semibold">
            No categories selected
          </p>
        </div>
      )}
    </div>
  );
};

export default MainGrid;
