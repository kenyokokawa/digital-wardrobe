import React from "react";

const OneIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={(size * 2) / 5}
      height={size}
      viewBox="0 0 2 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 2V1H1V0H2V5H1V2H0Z" fill={color} />
    </svg>
  );
};

export default OneIcon;
