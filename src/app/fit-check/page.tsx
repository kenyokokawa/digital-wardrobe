import { notFound } from "next/navigation";
import { type ClothingItem } from "~/consts/types";
import { getUserClothingItemById } from "~/server/queries";
import FitCheckPage from "./_components/FitCheckPage";

const FitCheckPageWrapper = async ({
  searchParams,
}: {
  searchParams: { items?: string };
}) => {
  const itemIds = searchParams.items?.split(",").map(Number) ?? [];

  if (!itemIds.length) {
    notFound();
  }

  let items: ClothingItem[];
  try {
    items = await Promise.all(
      itemIds.map(async (id) => await getUserClothingItemById(id)),
    );
  } catch (error) {
    console.error("Error fetching items:", error);
    notFound();
  }

  return <FitCheckPage items={items} />;
};

export default FitCheckPageWrapper;
