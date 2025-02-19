"use client";
import React, { createContext, useContext, useState } from "react";
import { DEFAULT_CATEGORY_GROUPS, type CategorySection } from "~/consts/consts";

interface MainGridContextType {
  isImageFill: boolean;
  toggleImageFill: () => void;
  categorySections: CategorySection[];
  setCategorySections: React.Dispatch<React.SetStateAction<CategorySection[]>>;
}

const MainGridContext = createContext<MainGridContextType | undefined>(
  undefined,
);

export function MainGridProvider({ children }: { children: React.ReactNode }) {
  const [isImageFill, setIsImageFill] = useState(false);
  const [categorySections, setCategorySections] = useState<CategorySection[]>(
    DEFAULT_CATEGORY_GROUPS,
  );

  const toggleImageFill = () => {
    setIsImageFill((prev) => !prev);
  };

  return (
    <MainGridContext.Provider
      value={{
        isImageFill,
        toggleImageFill,
        categorySections,
        setCategorySections,
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
