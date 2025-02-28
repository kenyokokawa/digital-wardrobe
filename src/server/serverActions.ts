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

export const saveFit = async (
  ...args: Parameters<typeof queries.saveFit>
) => {
  return await queries.saveFit(...args);
};

export const deleteSavedFitById = async (
  ...args: Parameters<typeof queries.deleteSavedFitById>
) => {
  await queries.deleteSavedFitById(...args);
};

export const checkIfFitExists = async (
  ...args: Parameters<typeof queries.checkIfFitExists>
) => {
  return await queries.checkIfFitExists(...args);
};
