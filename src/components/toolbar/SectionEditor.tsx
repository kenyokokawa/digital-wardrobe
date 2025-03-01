import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
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
import { DEFAULT_CATEGORIES } from "~/consts/consts";
import { useMainGrid } from "~/contexts/MainGridContext";
import DownTriangleIcon from "../icons/DownTriangleIcon";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CategorySectionContainer from "./CategorySectionContainer";
import SectionlessCategoriesContainer from "./SectionlessCategoriesContainer";

const SectionEditor = () => {
  const { categorySections, setCategorySections } = useMainGrid();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
    const item = DEFAULT_CATEGORIES.find((item) => item.id === activeId)!;

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
  };

  const addNewSection = () => {
    const id = `custom-${Date.now()}`;
    setCategorySections([
      ...categorySections,
      {
        id,
        label: "New Section",
        items: [],
        isVisible: true,
      },
    ]);
  };

  return (
    <div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <span className="flex cursor-pointer flex-row items-center gap-2">
            <span className="text-md font-semibold">Edit Sections</span>
            <DownTriangleIcon size={14} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="max-h-[calc(100vh-128px)] w-[min(100vw,600px)] overflow-y-scroll p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-chakra text-lg font-semibold">
                Section Editor
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPopoverOpen(false)}
              >
                Close
              </Button>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-col gap-2">
                <SortableContext
                  items={categorySections.map((g) => `section-${g.id}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <SectionlessCategoriesContainer />
                  {categorySections.map((section) => (
                    <CategorySectionContainer
                      key={section.id}
                      section={section}
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

export default SectionEditor;
