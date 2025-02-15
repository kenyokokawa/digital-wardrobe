import { db } from "~/server/db";
import CategoryRow from "./CategoryRow";

const MainGrid = async () => {
  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
  });

  return (
    <div className="mt-4 flex flex-col gap-3 sm:mt-8 sm:gap-8">
      <CategoryRow
        category="Uncategorized"
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
    </div>
  );
};

export default MainGrid;
