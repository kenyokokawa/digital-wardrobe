import React from "react";

const VerticalIcon = ({
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
      <path d="M0 3H1V4H0V3Z" fill={color} />
      <path d="M1 4H2V5H1V4Z" fill={color} />
      <path d="M2 3H3V4H2V3Z" fill={color} />
      <path d="M0 2H1V1H0V2Z" fill={color} />
      <path d="M1 1H2V0H1V1Z" fill={color} />
      <path d="M2 2H3V1H2V2Z" fill={color} />
    </svg>
  );
};

export default VerticalIcon;
