import LogOutIn from "../account/LogInOut";
import SideNav from "./SideNav";

const Nav = () => {
  return (
    <nav className="flex w-full max-w-6xl p-4 pb-0">
      <div className="justify-space flex w-full flex-row justify-between border-2 border-black p-2">
        <div className="shrink-1 flex grow basis-full items-center justify-start"></div>
        <h2 className="shrink-0 font-silkscreen text-xl sm:text-3xl">
          Digital Wardrobe
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
