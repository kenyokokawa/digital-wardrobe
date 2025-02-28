import { notFound } from "next/navigation";
import { type ClothingItem } from "~/consts/types";
import { getUserClothingItemById, checkIfFitExists } from "~/server/queries";
import FitCheckPage from "./_components/FitCheckPage";

const FitCheckPageWrapper = async ({
  searchParams,
}: {
  searchParams: { items?: string; fitId?: string };
}) => {
  const itemIds = searchParams.items?.split(",").map(Number) ?? [];
  const fitId = searchParams.fitId ? parseInt(searchParams.fitId) : undefined;

  if (!itemIds.length) {
    notFound();
  }

  let items: ClothingItem[];
  try {
    items = await Promise.all(
      itemIds.map(async (id) => await getUserClothingItemById(id)),
    );

    if (!fitId) {
      const existingFitId = await checkIfFitExists(itemIds);
      if (existingFitId) {
        return <FitCheckPage items={items} fitId={existingFitId} />;
      }
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    notFound();
  }

  return <FitCheckPage items={items} fitId={fitId} />;
};

export default FitCheckPageWrapper;
