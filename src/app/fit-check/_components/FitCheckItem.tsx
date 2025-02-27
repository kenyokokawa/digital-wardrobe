import React from "react";
import { type ClothingItem } from "~/consts/types";
import { type FitCheckSettings } from "./FitCheckControls";
import ItemImage from "~/components/item/ItemImage";
import { isItemDemo } from "~/lib/utils";

type FitCheckItemProps = {
  item: ClothingItem;
  settings: FitCheckSettings;
  textSizeClass: string;
  className?: string;
};

const FitCheckItem = ({
  item,
  settings,
  textSizeClass,
  className = "",
}: FitCheckItemProps) => {
  return (
    <div
      className={`flex ${
        settings.layout === "horizontal" ? "flex-row" : "flex-col"
      } items-center gap-4 ${className} h-full`}
    >
      <div className={`relative aspect-square h-full w-full`}>
        <ItemImage
          src={item.imgUrl}
          alt={item.name || "Clothing item"}
          isDemo={isItemDemo(item)}
          fit={"contain"}
        />
      </div>
      {(settings.showName || settings.showBrand) && (
        <div
          className={`text-center ${textSizeClass} ${
            settings.layout === "horizontal" ? "shrink-0 basis-36" : "w-full"
          }`}
        >
          {settings.showName && <h2 className="font-medium">{item.name}</h2>}
          {settings.showBrand && <p>{item.brand}</p>}
        </div>
      )}
    </div>
  );
};

export default FitCheckItem;
