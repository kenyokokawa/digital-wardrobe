import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { type CategorySection } from "~/consts/consts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategoryItemDraggable from "./CategoryItemDraggable";
import DragIcon from "../icons/DragIcon";

interface Props {
  section: CategorySection;
  isEditing: boolean;
  onDelete: () => void;
  onRename: (newLabel: string) => void;
}

const CategorySectionContainer = ({
  section,
  isEditing,
  onDelete,
  onRename,
}: Props) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newLabel, setNewLabel] = useState(section.label);

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
      <div className="flex items-center justify-between">
        {isRenaming ? (
          <div className="flex gap-2">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-40"
              size="sm"
            />
            <Button
              onClick={() => {
                onRename(newLabel);
                setIsRenaming(false);
              }}
              size="sm"
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              {...listeners}
              className="w-fit aspect-square cursor-grab bg-zinc-100 p-2.5"
            >
              <DragIcon size={16} />
            </span>
            <h4 className="font-semibold">{section.label}</h4>
          </div>
        )}

        {isEditing && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRenaming(true)}
              variant="outline"
              size="xs"
            >
              Rename
            </Button>
            <Button onClick={onDelete} variant="destructive" size="xs">
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {section.items.map((item) => {
          //   <span
          //   key={item.id}
          //   className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          // >
          return <CategoryItemDraggable key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CategorySectionContainer;
