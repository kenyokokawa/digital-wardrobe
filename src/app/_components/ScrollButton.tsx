import LeftArrowIcon from "~/components/icons/LeftArrowIcon";
import RightArrowIcon from "~/components/icons/RightArrowIcon";

interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const ScrollButton = ({ direction, onClick }: ScrollButtonProps) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === "left" ? "left-4" : "right-4"} top-1/2 z-10 hidden -translate-y-1/2 transform lg:group-hover:block`}
  >
    <div className="pointer border-3 flex items-center justify-center border-black bg-white p-2 hover:bg-gray-100">
      {direction === "left" ? (
        <LeftArrowIcon size={20} />
      ) : (
        <RightArrowIcon size={20} />
      )}
    </div>
  </button>
);
