"use client";

import { useState } from "react";
import { type ClothingItem } from "~/consts/types";
import FitCheckControls, { type FitCheckSettings } from "./FitCheckControls";
import ItemImage from "~/components/item/ItemImage";
import { isItemDemo } from "~/lib/utils";

const DEFAULT_SETTINGS: FitCheckSettings = {
  columns: 2,
  fontSize: "base",
  showName: true,
  showBrand: true,
  layout: "vertical",
};

const FitCheckPage = ({ items }: { items: ClothingItem[] }) => {
  const [settings, setSettings] = useState<FitCheckSettings>(DEFAULT_SETTINGS);

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }[settings.columns];

  const gridWidthClass = settings.columns === 1 ? "max-w-3xl" : "";

  const textSizeClass = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  }[settings.fontSize];

  return (
    <div className="container-page">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="shrink-0 font-chakra text-3xl font-bold">FIT CHECK</h1>
        <FitCheckControls settings={settings} setSettings={setSettings} />
      </div>

      <div className={`mx-auto grid my-16 ${gridColsClass} ${gridWidthClass} gap-6`}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              settings.layout === "horizontal" ? "flex-row" : "flex-col"
            } items-center gap-4`}
          >
            <div className={`relative aspect-square w-full`}>
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
                  settings.layout === "horizontal" ? "w-1/2" : "w-full"
                }`}
              >
                {settings.showName && (
                  <h2 className="font-semibold">{item.name || "Untitled"}</h2>
                )}
                {settings.showBrand && (
                  <p className="text-gray-600">
                    {item.brand || "brand unknown"}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitCheckPage;
