import React from "react";

const MinusIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={size * 0.2}
      viewBox="0 0 5 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H5V1H0V0Z" fill="black" />
    </svg>
  );
};

export default MinusIcon;
