import React from "react";
import type { ClothingItem } from "~/types/global";

const CategoryRowItem = ({ item }: { item: ClothingItem }) => {
  return (
    <div className="group relative aspect-square h-full flex-shrink-0 snap-center">
      <img
        src={item.imgUrl}
        alt="mock"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-md font-semibold text-white sm:text-lg">
          {item.name || "Untitled"}
        </h3>
        <p className="text-sm text-white/90">{item.brand || "brand unknown"}</p>
      </div>
    </div>
  );
};

export default CategoryRowItem;
