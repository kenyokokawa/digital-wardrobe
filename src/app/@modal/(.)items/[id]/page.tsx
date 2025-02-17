import { redirect } from "next/navigation";
import ItemView from "~/components/item/ItemView";
import { getClothingItemById } from "~/server/serverActions";
import { type ClothingItem } from "~/consts/types";
import { Modal } from "../../../../components/layout/Modal";

const ItemPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let item: ClothingItem;
  try {
    item = await getClothingItemById(parseInt(id));
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
