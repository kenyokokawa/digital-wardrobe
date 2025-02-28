"use client";

import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type ClothingItem } from "~/consts/types";
import { saveFit } from "~/server/serverActions";
import FitCheckControls, { type FitCheckSettings } from "./FitCheckControls";
import FitCheckFreeform from "./FitCheckFreeform";
import FitCheckGrid from "./FitCheckGrid";

const DEFAULT_SETTINGS: FitCheckSettings = {
  columns: 2,
  fontSize: "base",
  showName: true,
  showBrand: true,
  layout: "vertical",
  isDraggable: false,
};

interface FitCheckPageProps {
  items: ClothingItem[];
  fitId?: number;
}

const FitCheckPage = ({ items, fitId }: FitCheckPageProps) => {
  const [settings, setSettings] = useState<FitCheckSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [fitName, setFitName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const router = useRouter();

  const textSizeClass = {
    sm: "text-sm",
    base: "text-lg",
    lg: "text-2xl",
  }[settings.fontSize];

  const handleSaveFit = async () => {
    try {
      setIsSaving(true);
      const itemIds = items.map((item) => item.id);
      await saveFit(fitName.trim(), itemIds);
      setShowSaveDialog(false);
      setFitName("");
      toast("Fit saved successfully");
      router.refresh();
    } catch (error) {
      console.error("Error saving fit:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isSavedFit = fitId !== undefined;

  return (
    <div className="mb-8">
      <div className="application-width px-4 pt-2">
        <div className="mb-8 flex flex-col items-center justify-between gap-2 sm:gap-4 md:flex-row">
          <div className="flex w-full flex-row items-center justify-between gap-8 md:w-auto">
            <h1 className="shrink-0 font-chakra text-3xl font-bold">
              FIT CHECK
            </h1>
            {isSavedFit ? (
              <Button variant="outline" size="sm" disabled>
                Saved Fit
              </Button>
            ) : (
              <SignedIn>
                <Button
                  variant="default"
                  onClick={() => setShowSaveDialog(true)}
                >
                  Save Fit
                </Button>
              </SignedIn>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FitCheckControls settings={settings} setSettings={setSettings} />
          </div>
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

      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Save Fit</h2>
            <Input
              type="text"
              value={fitName}
              onChange={(e) => setFitName(e.target.value)}
              placeholder="Optional - fit name"
              className="mb-4"
              disabled={isSaving}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveFit}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitCheckPage;
