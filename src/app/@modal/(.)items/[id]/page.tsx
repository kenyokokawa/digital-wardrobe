import { redirect } from "next/navigation";
import ItemView from "~/components/item/ItemView";
import { getUserClothingItemById } from "~/server/queries";
import { type ClothingItem } from "~/types/global";
import { Modal } from "../../../../components/layout/Modal";

const ItemPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let item: ClothingItem;
  try {
    item = await getUserClothingItemById(parseInt(id));
  } catch (error) {
    console.error("Error fetching item:", error);
    redirect("/");
  }

  return (
    <Modal>
      <ItemView clothingItem={item} />
    </Modal>
  );
};

export default ItemPage;
