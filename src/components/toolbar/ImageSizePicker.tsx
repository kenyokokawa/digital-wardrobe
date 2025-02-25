import React from "react";
import SIcon from "../icons/SIcon";
import MIcon from "../icons/MIcon";
import LIcon from "../icons/LIcon";
import { useMainGrid } from "~/contexts/MainGridContext";
import { TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import type { GridImageSize } from "~/consts/types";

const IMAGE_SIZES: { id: GridImageSize; label: string }[] = [
  {
    id: "S",
    label: "small",
  },
  {
    id: "M",
    label: "medium",
  },
  {
    id: "L",
    label: "large",
  },
];

const IMAGE_SIZE_ICONS: Record<GridImageSize, React.ElementType> = {
  S: SIcon,
  M: MIcon,
  L: LIcon,
};

const ImageSizePicker = () => {
  const { gridImageSize, setGridImageSize } = useMainGrid();

  return (
    <div className="flex flex-row items-center gap-1">
      {IMAGE_SIZES.map((size) => {
        const isSelected = gridImageSize === size.id;
        return (
          <Tooltip key={size.id}>
            <TooltipTrigger>
              <div
                onClick={() => setGridImageSize(size.id)}
                className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center ${
                  isSelected ? "bg-black" : "bg-white"
                }`}
              >
                {React.createElement(IMAGE_SIZE_ICONS[size.id], {
                  color: isSelected ? "white" : "black",
                  size: 12,
                })}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>grid size: {size.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ImageSizePicker;
