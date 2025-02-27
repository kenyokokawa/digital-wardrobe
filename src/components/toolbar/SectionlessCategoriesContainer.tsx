import { useSortable } from "@dnd-kit/sortable";
import { useMainGrid } from "~/contexts/MainGridContext";
import { Checkbox } from "../ui/checkbox";
import CategoryItemDraggable from "./CategoryItemDraggable";
import { Label } from "../ui/label";

const SectionlessCategoriesContainer = () => {
  const {
    categorySections,
    showSectionlessCategories,
    setShowSectionlessCategories,
    userCategories,
  } = useMainGrid();
  const { setNodeRef } = useSortable({
    id: `section-null`,
  });

  const uncategorizedItems = userCategories.filter(
    (userCategory) =>
      !categorySections.some((section) =>
        section.items.some((i) => i.id === userCategory.id),
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
          <Label htmlFor={"uncategorized-visible-toggle"} className="text-sm">
            visible
          </Label>
        </div>
      </div>
      {uncategorizedItems.map((item) => (
        <CategoryItemDraggable key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SectionlessCategoriesContainer;
