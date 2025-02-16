import React from "react";

const XIcon = ({
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
      <path d="M0 0H1V1H0V0Z" fill={color} />
      <path d="M3 1H4V2H3V1Z" fill={color} />
      <path d="M3 3H4V4H3V3Z" fill={color} />
      <path d="M4 0H5V1H4V0Z" fill={color} />
      <path d="M4 4H5V5H4V4Z" fill={color} />
      <path d="M1 3H2V4H1V3Z" fill={color} />
      <path d="M0 4H1V5H0V4Z" fill={color} />
      <path d="M1 1H2V2H1V1Z" fill={color} />
      <path d="M2 2H3V3H2V2Z" fill={color} />
    </svg>
  );
};

export default XIcon;
