"use client";
import { type ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import ItemsRow from "./ItemsRow";
import SectionRow from "./SectionRow";
import FitCheckButton from "~/components/FitCheckButton";

const MainGrid = ({ items }: { items: ClothingItem[] }) => {
  const { categorySections, showSectionlessCategories } = useMainGrid();

  const uncategorizedItems = items.filter((item) => !item.category);

  const sectionlessCategoryItems = items.filter(
    (item) =>
      item.category &&
      !categorySections.some((section) =>
        section.items.some((i) => i.id === item.category),
      ),
  );

  const allSectionIds = categorySections.flatMap((section) =>
    section.items.map((item) => item.id),
  );

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-8">
        {uncategorizedItems.length > 0 && (
          <ItemsRow label="Uncategorized" items={uncategorizedItems} />
        )}

        {showSectionlessCategories && sectionlessCategoryItems.length > 0 && (
          <ItemsRow
            label="Sectionless Items"
            items={sectionlessCategoryItems}
          />
        )}

        {categorySections
          .filter((section) => section.isVisible)
          .map((section) => (
            <SectionRow key={section.id} items={items} section={section} />
          ))}

        {allSectionIds.length === 0 && (
          <div className="flex justify-center p-4">
            <p className="text-center font-chakra text-xl font-semibold">
              No categories selected
            </p>
          </div>
        )}
      </div>
      <FitCheckButton />
    </>
  );
};

export default MainGrid;
