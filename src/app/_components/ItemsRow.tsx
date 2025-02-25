import { useRef } from "react";
import type { ClothingItem } from "~/consts/types";
import { useMainGrid } from "~/contexts/MainGridContext";
import CategoryRowItem from "./CategoryRowItem";
import { useItemsRowScroll } from "./hooks/useItemsRowScroll";
import { useItemsRowSelection } from "./hooks/useItemsRowSelection";
import RowInfo from "./RowInfo";
import { ScrollButton } from "./ScrollButton";

const sizeClasses = {
  S: "h-28 sm:h-40",
  M: "h-48 sm:h-64",
  L: "h-72 sm:h-96",
};

const gutterClasses = {
  S: "w-[calc(50vw-56px)] sm:w-[calc(50vw-80px)]",
  M: "w-[calc(50vw-96px)] sm:w-[calc(50vw-128px)]",
  L: "w-[calc(50vw-144px)] sm:w-[calc(50vw-192px)]",
};

const ItemsRow = ({
  label,
  items,
  sectionId,
}: {
  label: string;
  items: ClothingItem[];
  sectionId?: string;
}) => {
  const { centeredItems, updateCenteredItems, gridImageSize } = useMainGrid();
  const rowRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, scrollBy } = useItemsRowScroll(
    rowRef,
    gridImageSize,
  );
  useItemsRowSelection(
    rowRef,
    sectionId,
    items,
    gridImageSize,
    updateCenteredItems,
    centeredItems,
  );

  const rowHeightClass = items.length
    ? sizeClasses[gridImageSize]
    : "h-16 sm:h-24";

  return (
    <div className="group relative">
      <div
        id={`${sectionId}-row-scroll-container`}
        className="scrollbar-hide no-scrollbar w-screen snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        <div
          ref={rowRef}
          className={`flex min-w-max bg-zinc-50 ${rowHeightClass}`}
        >
          <div className={gutterClasses[gridImageSize]} aria-hidden="true" />
          <div className="flex flex-row gap-2 sm:gap-4">
            {items.map((item) => (
              <CategoryRowItem
                key={item.id}
                item={item}
                isCentered={
                  sectionId ? item.id === centeredItems[sectionId] : false
                }
              />
            ))}
          </div>
          <div className={gutterClasses[gridImageSize]} aria-hidden="true" />
        </div>
      </div>
      {canScrollLeft && (
        <ScrollButton direction="left" onClick={() => scrollBy("left")} />
      )}
      {canScrollRight && (
        <ScrollButton direction="right" onClick={() => scrollBy("right")} />
      )}
      <RowInfo label={label} length={items.length} />
    </div>
  );
};

export default ItemsRow;
