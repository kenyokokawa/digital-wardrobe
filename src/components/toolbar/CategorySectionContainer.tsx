import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { type CategorySection } from "~/consts/consts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategoryItemDraggable from "./CategoryItemDraggable";
import DragIcon from "../icons/DragIcon";

import { useMainGrid } from "~/contexts/MainGridContext";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Props {
  section: CategorySection;
}

const CategorySectionContainer = ({ section }: Props) => {
  const { updateSection, deleteSection } = useMainGrid();
  const [newLabel, setNewLabel] = useState(section.label);

  useEffect(() => {
    setNewLabel(section.label);
  }, [section.label]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `section-${section.id}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2 border-gray-200 p-4"
      {...attributes}
    >
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="flex items-start gap-2 sm:items-center">
          <span
            {...listeners}
            className="aspect-square w-fit cursor-grab bg-zinc-100 p-2.5"
          >
            <DragIcon size={16} />
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSection({ ...section, label: newLabel });
            }}
            className="flex flex-wrap items-center gap-2"
          >
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-40 font-semibold"
              size="sm"
            />
            {newLabel !== section.label && (
              <div className="flex items-center gap-2">
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setNewLabel(section.label)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </>
              </div>
            )}
          </form>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={section.id + "-visible-toggle"}
              checked={section.isVisible}
              onCheckedChange={(checked) => {
                updateSection({ ...section, isVisible: Boolean(checked) });
              }}
            />
            <Label htmlFor={section.id + "-visible-toggle"} className="text-sm">
              visible
            </Label>
          </div>
          <Button
            onClick={() => deleteSection(section.id)}
            variant="destructive"
            size="xs"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {section.items.map((item) => {
          return <CategoryItemDraggable key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CategorySectionContainer;
