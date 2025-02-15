import { getUserClothingItems } from "~/server/queries";
import CategoryRow from "./CategoryRow";
import { auth } from "@clerk/nextjs/server";
const MainGrid = async () => {
  const user = await auth();

  let items: any[] = [];
  if (user.userId) {
    items = await getUserClothingItems();
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-8">
      {items.filter((item) => !item.category).length > 0 && (
        <CategoryRow
          category="Uncategorized"
          items={items.filter((item) => !item.category)}
        />
      )}
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
        items={items.filter((item) => item.category === "shoes")}
      />
    </div>
  );
};

export default MainGrid;
