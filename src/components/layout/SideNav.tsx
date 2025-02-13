"use client";
import { useState } from "react";
import LogInOut from "../account/LogInOut";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleNav}
        className="fixed right-7 top-[30px] z-[60] sm:hidden"
      >
        <div className="space-y-1">
          <span
            className={`block h-1 w-6 bg-black transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45 bg-white" : ""}`}
          />
          <span
            className={`block h-1 w-6 bg-black transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-1 w-6 bg-black transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45 bg-white" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleNav}
        />
      )}

      <nav
        className={`w-70 fixed left-0 top-0 z-50 h-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-row justify-between">
            <h2 className="shrink-0 font-silkscreen text-xl sm:text-3xl">
              Digital Wardrobe
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <LogInOut />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
