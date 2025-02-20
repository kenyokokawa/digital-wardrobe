"use client";
import React, { createContext, useContext, useState } from "react";
import { CategoryItem, type CategorySection } from "~/consts/consts";
import { buildDefaultSectionsFromCategories } from "~/lib/utils";

interface MainGridContextType {
  isImageFill: boolean;
  toggleImageFill: () => void;
  userCategories: CategoryItem[];
  showSectionlessCategories: boolean;
  setShowSectionlessCategories: (show: boolean) => void;
  categorySections: CategorySection[];
  setCategorySections: React.Dispatch<React.SetStateAction<CategorySection[]>>;
  updateSection: (section: CategorySection) => void;
  deleteSection: (sectionId: string) => void;
}

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

  const [categorySections, setCategorySections] = useState<CategorySection[]>(
    buildDefaultSectionsFromCategories(userCategories),
  );

  const toggleImageFill = () => {
    setIsImageFill((prev) => !prev);
  };

  const updateSection = (section: CategorySection) => {
    setCategorySections((prev) =>
      prev.map((s) => (s.id === section.id ? section : s)),
    );
  };

  const deleteSection = (sectionId: string) => {
    setCategorySections((prev) => prev.filter((s) => s.id !== sectionId));
  };

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
