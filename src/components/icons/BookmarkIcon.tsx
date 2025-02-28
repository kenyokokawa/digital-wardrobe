import React from "react";

const BookmarkIcon = ({ size = 5 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 5H0V0H5V5H4V4H3V3H2V4H1V5Z" fill="black" />
    </svg>
  );
};

export default BookmarkIcon;
