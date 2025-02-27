"use client";

import { useState } from "react";
import { type ClothingItem } from "~/consts/types";
import FitCheckControls, { type FitCheckSettings } from "./FitCheckControls";
import FitCheckGrid from "./FitCheckGrid";
import FitCheckFreeform from "./FitCheckFreeform";

const DEFAULT_SETTINGS: FitCheckSettings = {
  columns: 2,
  fontSize: "base",
  showName: true,
  showBrand: true,
  layout: "vertical",
  isDraggable: false,
};

const FitCheckPage = ({ items }: { items: ClothingItem[] }) => {
  const [settings, setSettings] = useState<FitCheckSettings>(DEFAULT_SETTINGS);

  const textSizeClass = {
    sm: "text-sm",
    base: "text-lg",
    lg: "text-2xl",
  }[settings.fontSize];

  return (
    <div className="mb-8">
      <div className="application-width px-4 pt-2">
        <div className="mb-8 flex flex-col items-center justify-between gap-2 sm:gap-4 md:flex-row">
          <h1 className="shrink-0 font-chakra text-3xl font-bold">FIT CHECK</h1>
          <FitCheckControls settings={settings} setSettings={setSettings} />
        </div>
      </div>

      {settings.isDraggable ? (
        <FitCheckFreeform
          items={items}
          settings={settings}
          textSizeClass={textSizeClass}
        />
      ) : (
        <div className="application-width px-4">
          <FitCheckGrid
            items={items}
            settings={settings}
            textSizeClass={textSizeClass}
          />
        </div>
      )}
    </div>
  );
};

export default FitCheckPage;
