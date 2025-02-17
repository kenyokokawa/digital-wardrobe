import { notFound } from "next/navigation";
import ItemView from "~/components/item/ItemView";
import { getClothingItemById } from "~/server/serverActions";
import { type ClothingItem } from "~/consts/types";

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
    <section className="container-page">
      <ItemView clothingItem={item} />
    </section>
  );
};

export default ItemPage;
