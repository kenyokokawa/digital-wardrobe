"use server";
import * as queries from "./queries";

export const updateUserClothingItemById = async (
  ...args: Parameters<typeof queries.updateUserClothingItemById>
) => {
  await queries.updateUserClothingItemById(...args);
};
