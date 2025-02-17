import React from "react";

const ContractIcon = ({ size = 5 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 2V0H4V1H5V2H3Z" fill="black" />
      <path d="M2 2H0V1H1V0H2V2Z" fill="black" />
      <path d="M3 3V5H4V4H5V3H3Z" fill="black" />
      <path d="M2 3H0V4H1V5H2V3Z" fill="black" />
    </svg>
  );
};

export default ContractIcon;
