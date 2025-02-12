import React from "react";
import Tag from "~/components/shared/Tag";
import type { ClothingItem } from "~/types/global";

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
        <div className="flex min-w-max gap-4">
          <div className="w-[calc(50vw-160px)]" aria-hidden="true" />
          {items.map((img, index) => (
            <div
              key={img.url}
              className="scroll-item aspect-square w-80 flex-shrink-0 snap-center"
            >
              <img
                src={img.url}
                alt="mock"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="w-[calc(50vw-160px)]" aria-hidden="true" />
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex">
            <Tag>{category}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
