import "server-only";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { type ClothingItem, type SavedFit } from "~/consts/types";
import { clothingItems, savedFits } from "./db/schema";
import { utapi } from "~/app/api/uploadthing/api";
import { CategoryItem } from "~/consts/consts";

const getUserIdWithDemoFallback = async (): Promise<string> => {
  const user = await auth();
  if (!user.userId) {
    return process.env.NEXT_PUBLIC_DEFAULT_DEMO_USER_ID!;
  }
  return user.userId;
};

export const getUserClothingItems = async () => {
  const userId = await getUserIdWithDemoFallback();

  const items = await db.query.clothingItems.findMany({
    orderBy: (clothingItems, { asc }) => [asc(clothingItems.createdAt)],
    where: (clothingItems, { eq }) => eq(clothingItems.userId, userId),
  });

  return items;
};

export const getUserClothingItemById = async (id: number) => {
  const userId = await getUserIdWithDemoFallback();

  const item = await db.query.clothingItems.findFirst({
    where: (clothingItems, { and, eq }) =>
      and(eq(clothingItems.id, id), eq(clothingItems.userId, userId)),
  });

  if (!item) {
    throw new Error("Not found");
  }

  return item;
};

export const getUserCategories = async (): Promise<CategoryItem[]> => {
  const userId = await getUserIdWithDemoFallback();

  const items = await db.query.clothingItems.findMany({
    columns: {
      category: true,
    },
    where: (clothingItems, { eq }) => eq(clothingItems.userId, userId),
  });

  const uniqueCategories = [
    ...new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => category !== null),
    ),
  ];

  return uniqueCategories.map((category) => ({
    id: category,
  }));
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

// Saved Fits
export const saveFit = async (name: string, itemIds: number[]) => {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  // Sort the itemIds to ensure consistent comparison
  const sortedItemIds = [...itemIds].sort((a, b) => a - b);

  const result = await db
    .insert(savedFits)
    .values({
      userId: user.userId,
      name,
      itemIds: sortedItemIds.join(","),
    })
    .returning();

  return result[0];
};

export const checkIfFitExists = async (
  itemIds: number[],
): Promise<number | null> => {
  const userId = await getUserIdWithDemoFallback();

  // Sort the itemIds to ensure consistent comparison
  const sortedItemIds = [...itemIds].sort((a, b) => a - b);
  const itemIdsString = sortedItemIds.join(",");

  const fits = await db.query.savedFits.findMany({
    where: (savedFits, { eq }) => eq(savedFits.userId, userId),
  });

  // Find a fit with the exact same items
  const existingFit = fits.find((fit) => {
    const fitItemIds = fit.itemIds
      .split(",")
      .map(Number)
      .sort((a, b) => a - b);
    return fitItemIds.join(",") === itemIdsString;
  });

  return existingFit ? existingFit.id : null;
};

export const getUserSavedFits = async (): Promise<SavedFit[]> => {
  const userId = await getUserIdWithDemoFallback();

  const fits = await db.query.savedFits.findMany({
    orderBy: (savedFits, { desc }) => [desc(savedFits.createdAt)],
    where: (savedFits, { eq }) => eq(savedFits.userId, userId),
  });

  return fits.map((fit) => ({
    ...fit,
    itemIds: fit.itemIds.split(",").map(Number),
  }));
};

export const getSavedFitById = async (id: number): Promise<SavedFit> => {
  const userId = await getUserIdWithDemoFallback();

  const fit = await db.query.savedFits.findFirst({
    where: (savedFits, { and, eq }) =>
      and(eq(savedFits.id, id), eq(savedFits.userId, userId)),
  });

  if (!fit) {
    throw new Error("Not found");
  }

  return {
    ...fit,
    itemIds: fit.itemIds.split(",").map(Number),
  };
};

export const deleteSavedFitById = async (id: number) => {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const fit = await db.query.savedFits.findFirst({
    where: (savedFits, { eq }) => eq(savedFits.id, id),
  });

  if (!fit) {
    throw new Error("Not found");
  }

  if (fit.userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  await db.delete(savedFits).where(eq(savedFits.id, id));
};
