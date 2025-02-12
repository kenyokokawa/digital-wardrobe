import React from "react";
import Tag from "~/components/shared/Tag";
import type { ClothingItem } from "~/types/global";
import CategoryRowItem from "./CategoryRowItem";

const CategoryRow = ({
  category,
  items,
}: {
  category: string;
  items: ClothingItem[];
}) => {
  return (
    <div className="relative">
      <div className="scrollbar-hide no-scrollbar w-screen snap-x snap-mandatory overflow-x-auto scroll-smooth">
        <div className="flex min-w-max gap-2 sm:gap-4">
          <div
            className="w-[calc(50vw-80px)] sm:w-[calc(50vw-160px)]"
            aria-hidden="true"
          />
          {items.map((item) => (
            <CategoryRowItem key={item.id} item={item} />
          ))}
          <div
            className="w-[calc(50vw-80px)] sm:w-[calc(50vw-160px)]"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex">
            <Tag>{category.toUpperCase()}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
