import React from "react";

const ExpandIcon = ({ size = 5 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5V3H1V4H2V5H0Z" fill="black" />
      <path d="M5 5H3V4H4V3H5V5Z" fill="black" />
      <path d="M0 0V2H1V1H2V0H0Z" fill="black" />
      <path d="M5 0H3V1H4V2H5V0Z" fill="black" />
    </svg>
  );
};

export default ExpandIcon;
