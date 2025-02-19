import { useSortable } from "@dnd-kit/sortable";
import { type CategoryItem } from "~/consts/consts";
import { useMainGrid } from "~/contexts/MainGridContext";
import CategoryItemDraggable from "./CategoryItemDraggable";

interface Props {
  categoryItems: CategoryItem[];
}

const UncategorizedSectionContainer = ({ categoryItems }: Props) => {
  const { categorySections } = useMainGrid();
  const { setNodeRef } = useSortable({
    id: `section-null`,
  });

  const uncategorizedItems = categoryItems.filter(
    (item) =>
      !categorySections.some((section) =>
        section.items.some((i) => i.id === item.id),
      ),
  );

  return (
    <div
      ref={setNodeRef}
      className="flex flex-wrap gap-2 border-2 border-dashed border-gray-200 p-2"
      id="section-null"
    >
      {uncategorizedItems.map((item) => (
        <CategoryItemDraggable key={item.id} item={item} />
      ))}
      {uncategorizedItems.length === 0 && (
        <div className="flex h-7 w-full items-center justify-center font-chakra text-sm text-gray-500">
          All categories are in sections
        </div>
      )}
    </div>
  );
};

export default UncategorizedSectionContainer;
