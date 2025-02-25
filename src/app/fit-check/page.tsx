import { notFound } from "next/navigation";
import ItemImage from "~/components/item/ItemImage";
import { type ClothingItem } from "~/consts/types";
import { isItemDemo } from "~/lib/utils";
import {
  getUserClothingItemById
} from "~/server/queries";

export const dynamic = "force-dynamic";

const FitCheckPage = async ({
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

  return (
    <div className="container-page">
      <h1 className="mb-8 font-chakra text-3xl font-bold">FIT CHECK</h1>
      <div className="mx-auto grid grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
          >
            <div className="relative aspect-square w-full">
              <ItemImage
                src={item.imgUrl}
                alt={item.name || "Clothing item"}
                isDemo={isItemDemo(item)}
                fit={"contain"}
              />
            </div>
            <div className="sm:basis-[200px]">
              <h2 className="text-xl font-semibold">
                {item.name || "Untitled"}
              </h2>
              <p className="text-gray-600">{item.brand || "brand unknown"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitCheckPage;
