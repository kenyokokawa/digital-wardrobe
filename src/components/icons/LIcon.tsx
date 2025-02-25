import React from "react";

const LIcon = ({
  color = "black",
  size = 5,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size * 0.8}
      height={size}
      viewBox="0 0 4 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5V0H1V4H4V5H0Z" fill={color} />
    </svg>
  );
};

export default LIcon;
