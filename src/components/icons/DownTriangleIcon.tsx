import React from "react";

const DownTriangleIcon = ({ size = 5 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 5 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 0H0V1H1V2H2V3H3V2H4V1H5V0Z" fill="black" />
    </svg>
  );
};

export default DownTriangleIcon;
