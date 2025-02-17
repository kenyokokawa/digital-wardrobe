import "server-only";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { type ClothingItem } from "~/consts/types";
import { clothingItems } from "./db/schema";
import { utapi } from "~/app/api/uploadthing/api";
import { isItemDemo } from "./utils";

export const getDemoClothingItems = async (demoId: number) => {
  const userId = `demo_${demoId}`;
  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
    where: (clothingItems, { eq }) => eq(clothingItems.userId, userId),
  });
  return items;
};

export const getDemoClothingItemById = async (id: number) => {
  const item = await db.query.clothingItems.findFirst({
    where: (clothingItems, { eq }) => eq(clothingItems.id, id),
  });
  if (!item) {
    throw new Error("Not found");
  }
  if (!isItemDemo(item)) {
    throw new Error("Unauthorized");
  }
  return item;
};

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

export const deleteUserClothingItemById = async (id: number) => {
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

  await utapi.deleteFiles([item.imgKey]);
  await db.delete(clothingItems).where(eq(clothingItems.id, id));
};
