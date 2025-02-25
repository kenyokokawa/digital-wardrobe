import React from "react";

const RightArrowIcon = ({
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
      <path d="M2 0H3V1H2V0Z" fill="black" />
      <path d="M2 4H3V5H2V4Z" fill="black" />
      <path d="M3 3H0V2H3V1H4V2H5V3H4V4H3V3Z" fill={color} />
    </svg>
  );
};

export default RightArrowIcon;
