import React from "react";

const Nav = () => {
  return (
    <nav className="flex w-full max-w-6xl p-4 pb-0">
      <div className="justify-space flex w-full flex-row justify-between border-2 border-black p-2">
        <div className="shrink-1 flex grow basis-full items-center justify-start"></div>
        <h2 className="shrink-0 font-silkscreen text-3xl">Digital Wardrobe</h2>
        <div className="shrink-1 flex grow basis-full items-center justify-end"></div>
      </div>
    </nav>
  );
};

export default Nav;
