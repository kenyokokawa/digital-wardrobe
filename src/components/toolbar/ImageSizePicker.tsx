import React from "react";
import SIcon from "../icons/SIcon";
import MIcon from "../icons/MIcon";
import LIcon from "../icons/LIcon";
import { useMainGrid } from "~/contexts/MainGridContext";
import { ButtonGroup, type ButtonGroupOption } from "../shared/ButtonGroup";
import type { GridImageSize } from "~/consts/types";

const IMAGE_SIZE_OPTIONS: ButtonGroupOption<GridImageSize>[] = [
  {
    value: "S",
    icon: SIcon,
    label: "small",
    tooltip: "grid size: small",
  },
  {
    value: "M",
    icon: MIcon,
    label: "medium",
    tooltip: "grid size: medium",
  },
  {
    value: "L",
    icon: LIcon,
    label: "large",
    tooltip: "grid size: large",
  },
];

const ImageSizePicker = () => {
  const { gridImageSize, setGridImageSize } = useMainGrid();

  return (
    <ButtonGroup
      options={IMAGE_SIZE_OPTIONS}
      value={gridImageSize}
      onChange={setGridImageSize}
    />
  );
};

export default ImageSizePicker;
