"use client";
import SectionEditor from "~/components/toolbar/SectionEditor";
import ImageFillToggle from "./ImageFillToggle";
import ImageSizePicker from "./ImageSizePicker";

const Toolbar = () => {
  return (
    <div className="application-width flex flex-row justify-between gap-2 p-4">
      <SectionEditor />
      <div className="flex flex-row gap-4">
        <ImageSizePicker />
        <ImageFillToggle />
      </div>
    </div>
  );
};

export default Toolbar;
