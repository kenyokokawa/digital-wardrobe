"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { CategoryItem, type CategorySection } from "~/consts/consts";
import { GridImageSize } from "~/consts/types";
import { buildDefaultSectionsFromCategories } from "~/lib/utils";

type CenteredItemsState = Record<string, number | null>;

type MainGridContextType = {
  isImageFill: boolean;
  toggleImageFill: () => void;
  userCategories: CategoryItem[];
  showSectionlessCategories: boolean;
  setShowSectionlessCategories: (show: boolean) => void;
  categorySections: CategorySection[];
  setCategorySections: React.Dispatch<React.SetStateAction<CategorySection[]>>;
  updateSection: (section: CategorySection) => void;
  deleteSection: (sectionId: string) => void;
  centeredItems: CenteredItemsState;
  updateCenteredItems: (sectionId: string, itemId: number | null) => void;
  gridImageSize: GridImageSize;
  setGridImageSize: React.Dispatch<React.SetStateAction<GridImageSize>>;
};

const MainGridContext = createContext<MainGridContextType | undefined>(
  undefined,
);

export function MainGridProvider({
  userCategories = [],
  children,
}: {
  userCategories: CategoryItem[];
  children: React.ReactNode;
}) {
  const [isImageFill, setIsImageFill] = useState(false);
  const [showSectionlessCategories, setShowSectionlessCategories] =
    useState(true);
  const [centeredItems, setCenteredItems] = useState<CenteredItemsState>({});
  const [gridImageSize, setGridImageSize] = useState<GridImageSize>("M");

  const [categorySections, setCategorySections] = useState<CategorySection[]>(
    buildDefaultSectionsFromCategories(userCategories),
  );

  const toggleImageFill = () => {
    setIsImageFill((prev) => !prev);
  };

  const updateSection = useCallback((section: CategorySection) => {
    setCategorySections((prev) =>
      prev.map((s) => (s.id === section.id ? section : s)),
    );
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setCategorySections((prev) => prev.filter((s) => s.id !== sectionId));
    setCenteredItems((prev) => {
      const newState = { ...prev };
      delete newState[sectionId];
      return newState;
    });
  }, []);

  const updateCenteredItems = useCallback(
    (sectionId: string, itemId: number | null) => {
      setCenteredItems((prev) => ({
        ...prev,
        [sectionId]: itemId,
      }));
    },
    [],
  );

  return (
    <MainGridContext.Provider
      value={{
        isImageFill,
        toggleImageFill,
        userCategories,
        showSectionlessCategories,
        setShowSectionlessCategories,
        categorySections,
        setCategorySections,
        updateSection,
        deleteSection,
        centeredItems,
        updateCenteredItems,
        gridImageSize,
        setGridImageSize,
      }}
    >
      {children}
    </MainGridContext.Provider>
  );
}

export function useMainGrid() {
  const context = useContext(MainGridContext);
  if (context === undefined) {
    throw new Error("useMainGrid must be used within a MainGridProvider");
  }
  return context;
}
