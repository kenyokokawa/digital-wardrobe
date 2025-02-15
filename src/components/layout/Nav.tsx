import Link from "next/link";
import LogOutIn from "../account/LogInOut";
import ImageUpload from "../actions/ImageUpload";
import SideNav from "./SideNav";
const Nav = async () => {
  return (
    <nav className="mb-4 flex w-full max-w-6xl p-4 sm:mb-8">
      <div className="justify-space flex w-full flex-row justify-between border-2 border-black p-2">
        <div className="shrink-1 flex grow basis-full items-center justify-start">
          <div className="hidden sm:block">
            <ImageUpload />
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
    </nav>
  );
};

export default Nav;
