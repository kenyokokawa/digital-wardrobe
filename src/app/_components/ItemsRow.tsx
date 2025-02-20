import React from "react";
import Tag from "~/components/shared/Tag";
import type { ClothingItem } from "~/consts/types";
import CategoryRowItem from "./CategoryRowItem";
import Badge from "~/components/shared/Badge";

const ItemsRow = ({
  label,
  items,
}: {
  label: string;
  items: ClothingItem[];
}) => {
  const rowHeightClass = items.length ? "h-40 sm:h-80" : "h-16 sm:h-24";

  let countText = "empty";
  if (items.length) {
    if (items.length === 1) {
      countText = "1 item";
    } else {
      countText = items.length + " items";
    }
  }
  return (
    <div className="relative">
      <div className="scrollbar-hide no-scrollbar w-screen snap-x snap-mandatory overflow-x-auto scroll-smooth">
        <div
          className={`flex min-w-max gap-2 bg-zinc-50 sm:gap-4 ${rowHeightClass}`}
        >
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
        <div className="mx-auto flex h-fit w-full max-w-6xl justify-between px-4">
          <Tag>{label}</Tag>
          <Badge>{countText}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ItemsRow;
