import React from "react";

const HorizontalIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={(size * 3) / 5}
      viewBox="0 0 5 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 0H2V1H1V0Z" fill={color} />
      <path d="M0 1H1V2H0V1Z" fill={color} />
      <path d="M1 2H2V3H1V2Z" fill={color} />
      <path d="M3 1H4V0H3V1Z" fill={color} />
      <path d="M4 2H5V1H4V2Z" fill={color} />
      <path d="M3 3H4V2H3V3Z" fill={color} />
    </svg>
  );
};

export default HorizontalIcon;
