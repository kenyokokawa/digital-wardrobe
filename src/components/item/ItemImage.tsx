import React from "react";
import Image from "next/image";

type ItemImageProps = {
  src: string;
  alt: string;
  isDemo: boolean;
  fit: "cover" | "contain";
};
const ItemImage = ({ src, alt, isDemo, fit }: ItemImageProps) => {
  return (
    <div>
      {isDemo ? (
        <Image src={src} alt={alt} fill style={{ objectFit: fit }} />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
        />
      )}
    </div>
  );
};

export default ItemImage;
