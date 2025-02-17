"use server";
import { auth } from "@clerk/nextjs/server";
import * as queries from "./queries";
export const updateUserClothingItemById = async (
  ...args: Parameters<typeof queries.updateUserClothingItemById>
) => {
  await queries.updateUserClothingItemById(...args);
};

export const deleteUserClothingItemById = async (
  ...args: Parameters<typeof queries.deleteUserClothingItemById>
) => {
  await queries.deleteUserClothingItemById(...args);
};

export const getClothingItemById = async (id: number) => {
  const user = await auth();
  if (!user.userId) {
    return queries.getDemoClothingItemById(id);
  }
  return queries.getUserClothingItemById(id);
};
