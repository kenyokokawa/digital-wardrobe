"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import type { ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import { isItemDemo } from "~/lib/utils";

const CategoryRowItem = ({ item }: { item: ClothingItem }) => {
  const { isImageFill } = useMainGrid();
  const isDemo = isItemDemo(item);

  return (
    <div
      className={`group relative aspect-square h-full flex-shrink-0 snap-center ${
        isImageFill ? "bg-zinc-100" : ""
      }`}
    >
      <Link href={`/items/${item.id}`}>
        {isDemo ? (
          <Image
            src={item.imgUrl}
            alt={item.name || "Clothing item"}
            fill
            style={{ objectFit: isImageFill ? "cover" : "contain" }}
          />
        ) : (
          <img
            src={item.imgUrl}
            alt={item.name || "Clothing item"}
            className={`h-full w-full ${isImageFill ? "object-cover" : "object-contain"}`}
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
