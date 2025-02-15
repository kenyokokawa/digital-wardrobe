import { db } from "~/server/db";
import CategoryRow from "./CategoryRow";
import { auth } from "@clerk/nextjs/server";

const MainGrid = async () => {
  const user = await auth();

  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
    where: (clothingItems, { eq }) =>
      eq(clothingItems.userId, user.userId ?? "demo_1"),
  });

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
