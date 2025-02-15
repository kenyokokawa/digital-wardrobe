import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export const getUserClothingItems = async () => {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
    where: (clothingItems, { eq }) => eq(clothingItems.userId, user.userId),
  });

  return items;
};

export const getUserClothingItemById = async (id: number) => {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const item = await db.query.clothingItems.findFirst({
    where: (clothingItems, { eq }) => eq(clothingItems.id, id),
  });

  if (!item) {
    throw new Error("Not found");
  }

  if (item.userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  return item;
};
