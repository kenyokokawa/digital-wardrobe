import { CATEGORIES } from "~/consts/consts";
import { useMainGrid } from "~/contexts/MainGridContext";
import DownTriangleIcon from "../icons/DownTriangleIcon";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CategoryEditor = () => {
  const { categories, setCategories } = useMainGrid();
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <span className="flex cursor-pointer flex-row items-center gap-2">
            <span className="text-md font-semibold">Edit Categories</span>
            <DownTriangleIcon size={14} />
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <p className="pb-2 font-medium">Categories to show:</p>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((category) => (
              <div className="flex items-center space-x-2" key={category.name}>
                <Checkbox
                  id={category.name}
                  checked={categories.includes(category.name)}
                  onCheckedChange={(checked) => {
                    setCategories((prev) =>
                      checked
                        ? [...prev, category.name]
                        : prev.filter((c) => c !== category.name),
                    );
                  }}
                />
                <label htmlFor={category.name} className="text-sm">
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryEditor;
