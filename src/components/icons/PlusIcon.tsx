import React from "react";

const PlusIcon = ({
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
      <path d="M0 2H5V3H0V2Z" fill={color} />
      <path d="M2 0H3V5H2V0Z" fill={color} />
    </svg>
  );
};

export default PlusIcon;
