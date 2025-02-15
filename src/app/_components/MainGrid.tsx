import { getUserClothingItems } from "~/server/queries";
import CategoryRow from "./CategoryRow";

const MainGrid = async () => {
  const items = await getUserClothingItems();

  return (
    <div className="mt-4 flex flex-col gap-3 sm:mt-8 sm:gap-8">
      <CategoryRow
        category="No Category"
        items={items.filter((item) => !item.category)}
      />
      <CategoryRow
        category="Tops"
        items={items.filter((item) => item.category === "top")}
      />
      <CategoryRow
        category="Bottoms"
        items={items.filter((item) => item.category === "bottom")}
      />
      <CategoryRow
        category="Shoes"
        items={items.filter((item) => item.category === "shoe")}
      />
    </div>
  );
};

export default MainGrid;
