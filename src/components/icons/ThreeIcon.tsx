import React from "react";

const ThreeIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={(size * 3) / 5}
      height={size}
      viewBox="0 0 3 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 0H0V1H2V2H0V3H2V4H0V5H3V0Z" fill={color} />
    </svg>
  );
};

export default ThreeIcon;
