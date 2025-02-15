import ItemDetails from "~/components/item/ItemDetails";
import { getUserClothingItemById } from "~/server/queries";

const ItemPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const item = await getUserClothingItemById(parseInt(id));

  return (
    <main>
      <ItemDetails clothingItem={item} />
    </main>
  );
};

export default ItemPage;
