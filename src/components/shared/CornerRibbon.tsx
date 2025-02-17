import React from "react";

interface CornerRibbonProps {
  text: string;
  position?: "left" | "right";
}

const CornerRibbon = ({ text, position = "right" }: CornerRibbonProps) => {
  return (
    <div
      className={`absolute ${
        position === "right" ? "-right-[55px]" : "-left-[55px]"
      } top-[10px] w-[170px] transform ${
        position === "right" ? "rotate-[30deg]" : "-rotate-[30deg]"
      } bg-green-500 text-center text-sm text-white`}
    >
      <p className="text-center font-chakra text-sm font-semibold text-white">
        {text}
      </p>
    </div>
  );
};

export default CornerRibbon;
