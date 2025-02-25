"use client";
import Link from "next/link";
import ItemImage from "~/components/item/ItemImage";
import type { ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import { isItemDemo } from "~/lib/utils";

const CategoryRowItem = ({
  item,
  isCentered = false,
}: {
  item: ClothingItem;
  isCentered?: boolean;
}) => {
  const { isImageFill } = useMainGrid();
  const isDemo = isItemDemo(item);

  return (
    <div
      data-item-id={item.id}
      className={`group relative box-border aspect-square h-full flex-shrink-0 snap-center transition-all duration-300 ${
        isImageFill ? "bg-zinc-100" : ""
      } ${isCentered ? "border-4 border-green-300" : "border-4 border-transparent"}`}
    >
      <Link href={`/items/${item.id}`}>
        <ItemImage
          src={item.imgUrl}
          alt={item.name || "Clothing item"}
          isDemo={isDemo}
          fit={isImageFill ? "cover" : "contain"}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <h3 className="text-md font-semibold text-white sm:text-lg">
            {item.name || "Untitled"}
          </h3>
          <p className="text-sm text-white/90">
            {item.brand || "brand unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryRowItem;
