"use client";
import React, { createContext, useContext, useState } from "react";
import { ClothingCategory } from "~/consts/consts";

interface MainGridContextType {
  isImageFill: boolean;
  toggleImageFill: () => void;
  categories: ClothingCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ClothingCategory[]>>;
}

const MainGridContext = createContext<MainGridContextType | undefined>(
  undefined,
);

export function MainGridProvider({ children }: { children: React.ReactNode }) {
  const [isImageFill, setIsImageFill] = useState(false);
  const [categories, setCategories] = useState<ClothingCategory[]>([
    ClothingCategory.TOPS,
    ClothingCategory.BOTTOMS,
    ClothingCategory.SHOES,
  ]);

  const toggleImageFill = () => {
    setIsImageFill((prev) => !prev);
  };

  return (
    <MainGridContext.Provider
      value={{ isImageFill, toggleImageFill, categories, setCategories }}
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
