import { useDraggable } from "@dnd-kit/core";
import { type CategoryItem } from "~/consts/consts";

interface Props {
  item: CategoryItem;
}

const CategoryItemDraggable = ({ item }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <span
      ref={setNodeRef}
      style={style}
      className="cursor-grab rounded-full bg-gray-100 px-3 py-1 text-sm"
      {...listeners}
      {...attributes}
    >
      {item.id}
    </span>
  );
};

export default CategoryItemDraggable;
