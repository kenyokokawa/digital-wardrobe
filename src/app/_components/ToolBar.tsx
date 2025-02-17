"use client";
import React from "react";
import ContractIcon from "~/components/icons/ContractIcon";
import ExpandIcon from "~/components/icons/ExpandIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useMainGrid } from "~/contexts/MainGridContext";

const ToolBar = () => {
  const { isImageFill, toggleImageFill } = useMainGrid();
  const expandTooltipText = isImageFill
    ? "Image expands to fill the space"
    : "Image shrinks to fit the space";

  return (
    <div className="application-width flex flex-row justify-between gap-2 p-4">
      <div className="flex flex-row items-center gap-2 cursor-pointer">

      </div>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger>
            <span onClick={toggleImageFill}>
              {isImageFill ? (
                <ExpandIcon size={18} />
              ) : (
                <ContractIcon size={18} />
              )}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{expandTooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ToolBar;
