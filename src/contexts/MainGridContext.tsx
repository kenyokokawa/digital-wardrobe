"use client";
import React, { createContext, useContext, useState } from "react";

interface MainGridContextType {
  isImageFill: boolean;
  toggleImageFill: () => void;
}

const MainGridContext = createContext<MainGridContextType | undefined>(
  undefined,
);

export function MainGridProvider({ children }: { children: React.ReactNode }) {
  const [isImageFill, setIsImageFill] = useState(false);

  const toggleImageFill = () => {
    setIsImageFill((prev) => !prev);
  };

  return (
    <MainGridContext.Provider value={{ isImageFill, toggleImageFill }}>
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
