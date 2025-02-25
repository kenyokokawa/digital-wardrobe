"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMainGrid } from "~/contexts/MainGridContext";
import { Button } from "./ui/button";

const FitCheckButton = () => {
  const { centeredItems, categorySections } = useMainGrid();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 70;

      if (isAtBottom || (currentScrollY > lastScrollY && currentScrollY > 10)) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleFitCheck = () => {
    // extra logic to sort the sections by their order in the categorySections array
    const orderedSectionIds = categorySections.map((s) => s.id);

    const itemsWithSections = Object.entries(centeredItems)
      .filter(([, itemId]) => itemId !== null)
      .map(([sectionId, itemId]) => [sectionId, itemId]);

    const sortedItems = itemsWithSections.sort(([sectionA], [sectionB]) => {
      const indexA = orderedSectionIds.indexOf(sectionA as string);
      const indexB = orderedSectionIds.indexOf(sectionB as string);
      return indexA - indexB;
    });

    const selectedItems = sortedItems.map(([, itemId]) => itemId).join(",");

    if (selectedItems) {
      router.push(`/fit-check?items=${selectedItems}`);
    }
  };

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container-page pb-8">
        <div className="mx-auto flex w-full max-w-6xl justify-center">
          <Button
            onClick={handleFitCheck}
            className="w-fit-content border-4 border-green-500 bg-white px-8 py-6 text-xl font-semibold text-green-500 shadow-lg hover:bg-green-500 hover:text-white"
          >
            FIT CHECK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FitCheckButton;
