"use client";
import { type ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import ItemsRow from "./ItemsRow";
import SectionRow from "./SectionRow";

const MainGrid = ({ items }: { items: ClothingItem[] }) => {
  const { categorySections } = useMainGrid();

  const uncategorizedItems = items.filter((item) => !item.category);
  const allCategoryNames = categorySections.flatMap((section) =>
    section.items.map((item) => item.id),
  );

  return (
    <div className="flex flex-col gap-3 sm:gap-8">
      {uncategorizedItems.length > 0 && (
        <ItemsRow label="Uncategorized" items={uncategorizedItems} />
      )}

      {categorySections.map((section) => (
        <SectionRow key={section.id} items={items} section={section} />
      ))}

      {allCategoryNames.length === 0 && (
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
