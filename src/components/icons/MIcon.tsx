import React from "react";

const MIcon = ({
  color = "black",
  size = 5,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0V5H1V1H2V5H3V1H4V5H5V0H0Z" fill={color} />
    </svg>
  );
};

export default MIcon;
