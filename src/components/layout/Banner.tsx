"use client";

import { useEffect, useState } from "react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }, 20000);

    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  if (!isVisible) return null;

  const points = [
    "currently displaying demo data (Ken's wardrobe)",
    "sign up to upload your own clothes",
  ];

  const scrollingContent = [
    ...points,
    ...points,
    ...points,
    ...points,
    ...points,
  ];

  return (
    <div
      className={`flex w-full items-center overflow-hidden bg-green-500 transition-all duration-300 ${
        isClosing ? "h-0" : "h-8 sm:h-10"
      }`}
    >
      <div className="animate-scroll relative flex items-center whitespace-nowrap">
        {scrollingContent.map((point, index) => (
          <div
            key={index}
            className="inline-flex pr-24 font-chakra text-sm text-white sm:text-base"
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
