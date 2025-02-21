"use server";
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
