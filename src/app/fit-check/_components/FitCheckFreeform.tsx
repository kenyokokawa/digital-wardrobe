import React, { useEffect, useState } from "react";
import { type ClothingItem } from "~/consts/types";
import { type FitCheckSettings } from "./FitCheckControls";
import FitCheckItem from "./FitCheckItem";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  ButtonGroup,
  type ButtonGroupOption,
} from "~/components/shared/ButtonGroup";
import PlusIcon from "~/components/icons/PlusIcon";
import MinusIcon from "~/components/icons/MinusIcon";

type ItemPosition = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const DEFAULT_ITEM_WIDTH = 300;
const DEFAULT_ITEM_HEIGHT = 300;
const SIZE_SCALE = 1.25;
const MIN_SIZE = 100;
const MAX_SIZE = 600;

const RESIZE_OPTIONS: ButtonGroupOption<"smaller" | "larger">[] = [
  {
    value: "smaller",
    icon: MinusIcon,
  },
  {
    value: "larger",
    icon: PlusIcon,
  },
];

const DraggableItem = ({
  item,
  settings,
  textSizeClass,
  width,
  height,
  onResize,
}: {
  item: ClothingItem;
  settings: FitCheckSettings;
  textSizeClass: string;
  width: number;
  height: number;
  onResize: (itemId: number, newWidth: number, newHeight: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const [isHovered, setIsHovered] = useState(false);

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        zIndex: 10,
        width: `${width}px`,
        height: `${height}px`,
      }
    : {
        width: `${width}px`,
        height: `${height}px`,
      };

  const handleResize = (action: "smaller" | "larger") => {
    let newWidth = width;
    let newHeight = height;

    if (action === "smaller") {
      newWidth = Math.max(MIN_SIZE, width / SIZE_SCALE);
      newHeight = Math.max(MIN_SIZE, height / SIZE_SCALE);
    } else {
      newWidth = Math.min(MAX_SIZE, width * SIZE_SCALE);
      newHeight = Math.min(MAX_SIZE, height * SIZE_SCALE);
    }

    onResize(item.id, newWidth, newHeight);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FitCheckItem
        item={item}
        settings={settings}
        textSizeClass={textSizeClass}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {isHovered && (
        <div
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <ButtonGroup
            options={RESIZE_OPTIONS}
            value={null as any}
            onChange={handleResize}
          />
        </div>
      )}
    </div>
  );
};

type FitCheckFreeformProps = {
  items: ClothingItem[];
  settings: FitCheckSettings;
  textSizeClass: string;
};

const FitCheckFreeform = ({
  items,
  settings,
  textSizeClass,
}: FitCheckFreeformProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [positions, setPositions] = useState<ItemPosition[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    // Initialize positions when draggable mode is turned on and positions are empty
    if (settings.isDraggable) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;

      // Calculate grid dimensions
      const itemWidth = DEFAULT_ITEM_WIDTH;
      const itemHeight = DEFAULT_ITEM_HEIGHT;
      const gapSize = 24;

      // Calculate total grid width and height
      const cols = Math.min(settings.columns, items.length);
      const gridWidth = cols * itemWidth + (cols - 1) * gapSize;

      const startX = (viewportWidth - gridWidth) / 2;

      // Create initial positions based on grid layout
      const initialPositions = items.map((item, index) => {
        const row = Math.floor(index / settings.columns);
        const col = index % settings.columns;

        return {
          id: item.id,
          x: startX + col * (itemWidth + gapSize),
          y: 100 + row * (itemHeight + gapSize),
          width: itemWidth,
          height: itemHeight,
        };
      });

      setPositions(initialPositions);
    }
  }, [settings.isDraggable, settings.columns, items, positions.length]);

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id as number);
  };

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;

    setPositions((prev) => {
      const existingPosition = prev.find((p) => p.id === active.id);

      if (existingPosition) {
        return prev.map((p) =>
          p.id === active.id ? { ...p, x: p.x + delta.x, y: p.y + delta.y } : p,
        );
      }

      return [
        ...prev,
        {
          id: active.id,
          x: delta.x,
          y: delta.y,
          width: DEFAULT_ITEM_WIDTH,
          height: DEFAULT_ITEM_HEIGHT,
        },
      ];
    });

    setActiveId(null);
  };

  const handleResize = (
    itemId: number,
    newWidth: number,
    newHeight: number,
  ) => {
    setPositions((prev) =>
      prev.map((p) =>
        p.id === itemId ? { ...p, width: newWidth, height: newHeight } : p,
      ),
    );
  };

  const getItemStyle = (itemId: number) => {
    const position = positions.find((p) => p.id === itemId);
    if (!position) return {};

    return {
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    };
  };

  const getItemSize = (itemId: number) => {
    const position = positions.find((p) => p.id === itemId);
    return {
      width: position?.width || DEFAULT_ITEM_WIDTH,
      height: position?.height || DEFAULT_ITEM_HEIGHT,
    };
  };

  return (
    <div className="relative mx-auto h-[calc(100vh-80px)] w-[calc(100vw-20px)] overflow-hidden sm:w-[calc(100vw-120px)] sm:border-2 sm:border-dashed sm:border-gray-200">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        {items.map((item) => {
          const { width, height } = getItemSize(item.id);
          return (
            <div
              key={item.id}
              style={getItemStyle(item.id) as any}
              className="relative"
            >
              <DraggableItem
                item={item}
                settings={settings}
                textSizeClass={textSizeClass}
                width={width}
                height={height}
                onResize={handleResize}
              />
            </div>
          );
        })}

        <DragOverlay>
          {activeId ? (
            <DraggableItem
              item={items.find((item) => item.id === activeId)!}
              settings={settings}
              textSizeClass={textSizeClass}
              width={getItemSize(activeId).width}
              height={getItemSize(activeId).height}
              onResize={handleResize}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default FitCheckFreeform;
