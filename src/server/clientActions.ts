"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { clothingItems } from "./db/schema";
import { eq } from "drizzle-orm";
import { type ClothingItem } from "~/types/global";

export const updateUserClothingItemById = async (
  id: number,
  data: Partial<ClothingItem>,
) => {
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

  await db.update(clothingItems).set(data).where(eq(clothingItems.id, id));
};
