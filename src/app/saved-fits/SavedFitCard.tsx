import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import TrashIcon from "~/components/icons/TrashIcon";
import { Button } from "~/components/ui/button";
import { ClothingItem, SavedFit } from "~/consts/types";

const getGridConfig = (itemCount: number): { cols: string; rows: string } => {
  if (itemCount <= 1) {
    return { cols: "grid-cols-1", rows: "grid-rows-1" };
  } else if (itemCount <= 4) {
    return { cols: "grid-cols-2", rows: "grid-rows-2" };
  } else {
    return { cols: "grid-cols-3", rows: "grid-rows-3" };
  }
};

const getPreviewItems = (items?: ClothingItem[]): ClothingItem[] => {
  if (!items) return [];
  return items.slice(0, 9);
};

const SavedFitCard = ({
  fit,
  handleDelete,
  isDeleting,
}: {
  fit: SavedFit;
  handleDelete: (id: number) => void;
  isDeleting: number | null;
}) => {
  const { cols, rows } = getGridConfig(fit.itemIds.length);
  const previewItems = getPreviewItems(fit.itemsData);
  const hasMoreItems = fit.itemIds.length > 9;
  return (
    <div
      key={fit.id}
      className="flex flex-col border border-gray-200 p-4 shadow-sm transition-all hover:border-gray-300"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-chakra text-xl font-semibold">
          {fit.name || "Untitled"}
        </h2>

        <SignedIn>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(fit.id)}
            disabled={isDeleting === fit.id}
          >
            {isDeleting === fit.id ? (
              <span className="block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
            ) : (
              <TrashIcon size={12} color="red" />
            )}
          </Button>
        </SignedIn>
      </div>

      <div className="mb-3 flex flex-row items-center justify-between text-sm">
        <p className="text-gray-500">
          {new Date(fit.createdAt).toLocaleDateString()}
        </p>
        <p className="font-medium text-gray-700">
          {fit.itemIds.length} {fit.itemIds.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div
        className={`relative mb-4 grid aspect-square gap-1 overflow-hidden ${cols} ${rows}`}
      >
        {previewItems.map((item: ClothingItem, index: number) => (
          <div key={index} className="relative aspect-square overflow-hidden">
            <img
              src={item.imgUrl}
              alt={item.name || `Item ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {hasMoreItems && (
          <div className="absolute bottom-1 right-1 bg-black px-2 py-1 text-xs font-medium text-white">
            +{fit.itemIds.length - 9}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Link href={`/saved-fits/${fit.id}`}>
          <Button variant="default" className="w-full">
            View Fit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SavedFitCard;
