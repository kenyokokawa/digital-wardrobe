import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Tooltip } from "@radix-ui/react-tooltip";
import Link from "next/link";
import LogOutIn from "../account/LogInOut";
import ImageUpload from "../actions/ImageUpload";
import CornerRibbon from "../shared/CornerRibbon";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Banner from "./Banner";
import { ComponentType } from "react";
import BookmarkIcon from "../icons/BookmarkIcon";
import SideNav from "./SideNav";

export type NavLink = {
  href: string;
  label: string;
  icon?: ComponentType<{ size?: number }>;
};

export const NAV_LINKS: NavLink[] = [
  {
    href: "/saved-fits",
    label: "Saved Fits",
    icon: BookmarkIcon,
  },
];

const Nav = async () => {
  return (
    <>
      <header className="flex w-full max-w-6xl p-4 pb-2">
        <div className="relative w-full overflow-hidden">
          <SignedOut>
            <CornerRibbon text="DEMO" position="left" />
          </SignedOut>
          <div className="justify-space flex w-full flex-row justify-between gap-2 border-3 border-black p-2">
            <div className="shrink-1 flex grow basis-full items-center justify-start">
              <div className="hidden sm:block">
                <SignedIn>
                  <ImageUpload />
                </SignedIn>
              </div>
            </div>
            <h2 className="pointer shrink-0 font-silkscreen text-xl sm:text-3xl">
              <Link href="/">Digital Wardrobe</Link>
            </h2>
            <div className="shrink-1 flex grow basis-full items-center justify-end gap-8">
              <div className="hidden items-center justify-end gap-4 sm:flex">
                <div className="flex items-center justify-center gap-2">
                  {NAV_LINKS?.map((link) => (
                    <Tooltip key={link.href}>
                      <TooltipTrigger asChild>
                        <Link href={link.href}>
                          {link.icon && <link.icon size={24} />}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <LogOutIn />
                </div>
              </div>
              <div className="flex items-center justify-center sm:hidden">
                <SideNav />
              </div>
            </div>
          </div>
        </div>
      </header>
      <SignedOut>
        <Banner />
      </SignedOut>
    </>
  );
};

export default Nav;
