import { useSortable } from "@dnd-kit/sortable";
import { type CategoryItem } from "~/consts/consts";
import { useMainGrid } from "~/contexts/MainGridContext";
import CategoryItemDraggable from "./CategoryItemDraggable";
import { Checkbox } from "../ui/checkbox";

interface Props {
  categoryItems: CategoryItem[];
}

const SectionlessCategoriesContainer = ({ categoryItems }: Props) => {
  const {
    categorySections,
    showSectionlessCategories,
    setShowSectionlessCategories,
  } = useMainGrid();
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
      <div className="flex w-full items-center justify-between gap-2">
        <p className="font-chakra text-sm">
          Categories without sections ({uncategorizedItems.length})
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={"uncategorized-visible-toggle"}
            checked={showSectionlessCategories}
            onCheckedChange={(checked) => {
              setShowSectionlessCategories(Boolean(checked));
            }}
          />
          <label htmlFor={"uncategorized-visible-toggle"} className="text-sm">
            visible
          </label>
        </div>
      </div>
      {uncategorizedItems.map((item) => (
        <CategoryItemDraggable key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SectionlessCategoriesContainer;
