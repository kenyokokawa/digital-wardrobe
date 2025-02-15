import React from "react";

type BadgeProps = {
  children: React.ReactNode;
};

const Badge = ({ children }: BadgeProps) => {
  return (
    <div className="bg-zinc-300 px-1 py-0 h-6 flex items-center justify-center">
      <label className="font-chakra text-xs">{children}</label>
    </div>
  );
};

export default Badge;
