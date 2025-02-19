import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CATEGORY_ITEMS } from "~/consts/consts";
import { useMainGrid } from "~/contexts/MainGridContext";
import DownTriangleIcon from "../icons/DownTriangleIcon";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CategorySectionContainer from "./CategorySectionContainer";
import UncategorizedSectionContainer from "./UncategorizedSectionContainer";

const CategoryEditor = () => {
  const { categorySections, setCategorySections } = useMainGrid();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId.startsWith("section-")) {
      const oldIndex = categorySections.findIndex(
        (g) => `section-${g.id}` === activeId,
      );
      const newIndex = categorySections.findIndex(
        (g) => `section-${g.id}` === overId,
      );

      setCategorySections(arrayMove(categorySections, oldIndex, newIndex));
      return;
    }

    const sourceSection = categorySections.find((section) =>
      section.items.some((item) => item.id === activeId),
    );

    const targetSection = categorySections.find(
      (section) => `section-${section.id}` === overId,
    );
    const item = CATEGORY_ITEMS.find((item) => item.id === activeId)!;

    if (
      targetSection &&
      sourceSection &&
      targetSection.id === sourceSection.id
    ) {
      return;
    }

    setCategorySections((sections) =>
      sections.map((section) => {
        if (targetSection && section.id === targetSection.id) {
          return {
            ...section,
            items: [...section.items, item],
          };
        } else if (sourceSection && section.id === sourceSection.id) {
          return {
            ...section,
            items: section.items.filter((i) => i.id !== activeId),
          };
        }
        return section;
      }),
    );

    setActiveId(null);
  };

  const addNewSection = () => {
    const id = `custom-${Date.now()}`;
    setCategorySections([
      ...categorySections,
      {
        id,
        label: "New Section",
        items: [],
      },
    ]);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <span className="flex cursor-pointer flex-row items-center gap-2">
            <span className="text-md font-semibold">Edit Sections</span>
            <DownTriangleIcon size={14} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="max-h-[calc(100vh-160px)] w-[min(100vw,600px)] overflow-y-scroll p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Section Editor</h3>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Done" : "Edit Sections"}
              </Button>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="mt-4 flex flex-col gap-4">
                <SortableContext
                  items={categorySections.map((g) => `section-${g.id}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <UncategorizedSectionContainer
                    categoryItems={CATEGORY_ITEMS}
                  />
                  {categorySections.map((section) => (
                    <CategorySectionContainer
                      key={section.id}
                      section={section}
                      isEditing={isEditing}
                      onDelete={() => {
                        setCategorySections((sections) =>
                          sections.filter((s) => s.id !== section.id),
                        );
                      }}
                      onRename={(newLabel) => {
                        setCategorySections((sections) =>
                          sections.map((s) =>
                            s.id === section.id ? { ...s, label: newLabel } : s,
                          ),
                        );
                      }}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
            <Button onClick={addNewSection} className="mt-2">
              New Section
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryEditor;
