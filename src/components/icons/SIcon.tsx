import React from "react";

const SIcon = ({
  size = 5,
  color = "black",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size * 0.8}
      height={size}
      viewBox="0 0 4 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 0H0V3H3V4H0V5H4V2H1V1H4V0Z" fill={color} />
    </svg>
  );
};

export default SIcon;
