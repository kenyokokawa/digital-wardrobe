"use client";
import CategoryEditor from "~/components/toolbar/CategoryEditor";
import ImageFillToggle from "./ImageFillToggle";

const Toolbar = () => {
  return (
    <div className="application-width flex flex-row justify-between gap-2 p-4">
      <CategoryEditor />
      <div className="flex flex-row gap-2">
        <ImageFillToggle />
      </div>
    </div>
  );
};

export default Toolbar;
