import React from "react";

const TwoIcon = ({
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
      <path d="M0 0V1H2V2H0V5H3V4H1V3H3V0H0Z" fill={color} />
    </svg>
  );
};

export default TwoIcon; 