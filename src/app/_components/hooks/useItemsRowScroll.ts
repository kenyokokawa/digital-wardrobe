import { useCallback, useEffect, useState } from "react";
import type { GridImageSize } from "~/consts/types";
export const useItemsRowScroll = (
  rowRef: React.RefObject<HTMLDivElement>,
  gridImageSize: GridImageSize,
) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollBy = useCallback((direction: "left" | "right") => {
    if (!rowRef.current) return;
    const container = rowRef.current.closest(".scrollbar-hide");
    if (!container) return;

    const scrollAmount = direction === "left" ? -1 : 1;
    const itemWidth =
      rowRef.current.querySelector("[data-item-id]")?.clientWidth ?? 0;
    const gap = 16;

    container.scrollBy({
      left: (itemWidth + gap) * scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const checkScrollable = useCallback(() => {
    if (!rowRef.current) return;
    const container = rowRef.current.closest(".scrollbar-hide");
    if (!container) return;

    const hasLeftScroll = container.scrollLeft > 0;
    const hasRightScroll =
      container.scrollLeft < container.scrollWidth - container.clientWidth;

    setCanScrollLeft(hasLeftScroll);
    setCanScrollRight(hasRightScroll);
  }, []);

  useEffect(() => {
    const container = rowRef.current?.closest(".scrollbar-hide");
    if (container) {
      container.addEventListener("scroll", checkScrollable);
      checkScrollable();

      return () => {
        container.removeEventListener("scroll", checkScrollable);
      };
    }
  }, [checkScrollable]);

  useEffect(() => {
    const container = rowRef.current?.closest(".scrollbar-hide");
    if (container) {
      container.scrollBy({
        left: -0.1,
      });
      checkScrollable();
    }
  }, [gridImageSize, checkScrollable]);

  return { canScrollLeft, canScrollRight, scrollBy, checkScrollable };
};
