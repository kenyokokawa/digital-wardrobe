import Link from "next/link";
import LogOutIn from "../account/LogInOut";
import ImageUpload from "../actions/ImageUpload";
import SideNav from "./SideNav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import CornerRibbon from "../shared/CornerRibbon";
import Banner from "./Banner";
const Nav = async () => {
  return (
    <>
      <header className="flex w-full max-w-6xl p-4 pb-2">
        <div className="relative w-full overflow-hidden">
          <SignedOut>
            <CornerRibbon text="DEMO" position="left" />
          </SignedOut>
          <div className="justify-space border-3 flex w-full flex-row justify-between gap-2 border-black p-2">
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
            <div className="shrink-1 flex grow basis-full items-center justify-end gap-4">
              <div className="hidden items-center justify-end gap-4 sm:flex">
                <LogOutIn />
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
