import { useEffect } from "react";
import type { ClothingItem } from "~/consts/types";

export const useItemsRowSelection = (
  rowRef: React.RefObject<HTMLDivElement>,
  sectionId: string | undefined,
  items: ClothingItem[],
  gridImageSize: "S" | "M" | "L",
  updateCenteredItems: (sectionId: string, itemId: number | null) => void,
  centeredItems: Record<string, number | null>,
) => {
  useEffect(() => {
    if (!sectionId) return;
    const handleScroll = () => {
      if (!rowRef.current) return;
      const containerCenter = window.innerWidth / 2;
      let closestItem: HTMLElement | null = null;
      let minDistance = Infinity;

      const items =
        rowRef.current.querySelectorAll<HTMLElement>("[data-item-id]");

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      if (closestItem) {
        const itemId = Number(closestItem.getAttribute("data-item-id"));
        if (itemId !== centeredItems[sectionId]) {
          updateCenteredItems(sectionId, itemId);
        }
      }
    };

    const scrollContainer = document.getElementById(
      `${sectionId}-row-scroll-container`,
    );
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [items, sectionId, updateCenteredItems, gridImageSize, centeredItems]);
};
