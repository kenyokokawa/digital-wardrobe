import { notFound } from "next/navigation";
import ItemView from "~/components/item/ItemView";
import { getClothingItemById } from "~/server/serverActions";
import { type ClothingItem } from "~/types/global";

const ItemPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let item: ClothingItem;

  try {
    item = await getClothingItemById(parseInt(id));
  } catch (error) {
    console.error("Error fetching item:", error);
    notFound();
  }

  return (
    <main>
      <ItemView clothingItem={item} />
    </main>
  );
};

export default ItemPage;
