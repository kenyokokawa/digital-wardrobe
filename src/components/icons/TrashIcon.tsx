import React from "react";

const TrashIcon = ({
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
      <path d="M2 0H3V1H2V0Z" fill={color} />
      <path d="M0 1V2H5V1H0Z" fill={color} />
      <path d="M1 5V2H2V4H3V2H4V5H1Z" fill={color} />
    </svg>
  );
};

export default TrashIcon;
