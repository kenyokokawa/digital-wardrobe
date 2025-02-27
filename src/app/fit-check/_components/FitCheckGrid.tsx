import React from "react";
import { type ClothingItem } from "~/consts/types";
import { type FitCheckSettings } from "./FitCheckControls";
import FitCheckItem from "./FitCheckItem";

type FitCheckGridProps = {
  items: ClothingItem[];
  settings: FitCheckSettings;
  textSizeClass: string;
};

const FitCheckGrid = ({
  items,
  settings,
  textSizeClass,
}: FitCheckGridProps) => {
  const gridWidthClass = settings.columns <= 2 ? "max-w-3xl" : "";

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }[settings.columns];

  return (
    <div
      className={`mx-auto my-16 grid ${gridColsClass} ${gridWidthClass} gap-6`}
    >
      {items.map((item) => (
        <FitCheckItem
          key={item.id}
          item={item}
          settings={settings}
          textSizeClass={textSizeClass}
        />
      ))}
    </div>
  );
};

export default FitCheckGrid;
