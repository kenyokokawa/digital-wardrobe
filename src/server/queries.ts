import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export const getUserClothingItems = async () => {
  const user = await auth();

  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
    where: (clothingItems, { eq }) => eq(clothingItems.userId, user.userId),
  });

  return items;
};
