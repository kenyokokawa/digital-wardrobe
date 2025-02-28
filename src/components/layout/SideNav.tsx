"use client";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogInOut from "../account/LogInOut";
import ImageUpload from "../actions/ImageUpload";
import { FOOTER_LINKS } from "./Footer";
import { NAV_LINKS } from "./Nav";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={toggleNav}
        className="absolute right-[12px] top-[14px] z-[60] sm:hidden"
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
          <SignedIn>
            <ImageUpload />
          </SignedIn>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {[...NAV_LINKS, ...FOOTER_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-row items-center gap-2 font-chakra font-medium text-zinc-600 hover:text-black"
            >
              <div className="basis-8">
                {link.icon && <link.icon size={24} />}
              </div>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideNav;
