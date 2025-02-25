import React from "react";

const LeftArrowIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 0H2V1H3V0Z" fill={color} />
      <path d="M3 4H2V5H3V4Z" fill={color} />
      <path d="M2 3H5V2H2V1H1V2H0V3H1V4H2V3Z" fill={color} />
    </svg>
  );
};

export default LeftArrowIcon;
