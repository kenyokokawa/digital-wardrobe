import React from "react";
import Link from "next/link";
import { NavLink } from "./Nav";

export const FOOTER_LINKS: NavLink[] = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "https://github.com/kenyokokawa/digital-wardrobe/",
    label: "GitHub",
  },
];
const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-zinc-200">
      <div className="application-width p-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h3 className="font-silkscreen text-lg">Digital Wardrobe</h3>
            <p className="font-chakra text-xs text-zinc-600">
              Discover new fits in just a few clicks
            </p>
          </div>
          <div className="mt-2 hidden flex-col items-end gap-2 sm:mt-0 sm:flex sm:flex-row sm:gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-chakra text-sm font-medium text-zinc-600 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
