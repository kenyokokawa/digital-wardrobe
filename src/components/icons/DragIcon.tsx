import React from "react";

const DragIcon = ({ size = 5 }: { size?: number }) => {
  return (
    <svg
      width={size * 0.8}
      height={size}
      viewBox="0 0 4 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H1V1H0V0Z" fill="black" />
      <path d="M0 2H1V3H0V2Z" fill="black" />
      <path d="M3 2H4V3H3V2Z" fill="black" />
      <path d="M3 0H4V1H3V0Z" fill="black" />
      <path d="M3 4H4V5H3V4Z" fill="black" />
      <path d="M0 4H1V5H0V4Z" fill="black" />
    </svg>
  );
};

export default DragIcon;
