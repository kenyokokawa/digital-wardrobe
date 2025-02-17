import React from "react";
import ExpandIcon from "../icons/ExpandIcon";
import { TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { useMainGrid } from "~/contexts/MainGridContext";
import ContractIcon from "../icons/ContractIcon";

const ImageFillToggle = () => {
  const { isImageFill, toggleImageFill } = useMainGrid();
  const expandTooltipText = isImageFill
    ? "Image expands to fill the space"
    : "Image shrinks to fit the space";
  return (
    <Tooltip>
      <TooltipTrigger>
        <span onClick={toggleImageFill}>
          {isImageFill ? <ExpandIcon size={18} /> : <ContractIcon size={18} />}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{expandTooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ImageFillToggle;
