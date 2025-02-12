import React from "react";

type TagProps = {
  children: React.ReactNode;
};

const Tag = ({ children }: TagProps) => {
  return (
    <div className="border-2 border-black bg-white px-1 py-0">
      <label className="font-chakra font-semibold">{children}</label>
    </div>
  );
};

export default Tag;
