import React from "react";
import { Modal } from "../../../../components/layout/Modal";
import { getUserClothingItemById } from "~/server/queries";
import ItemDetails from "~/components/item/ItemDetails";

const ItemPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const item = await getUserClothingItemById(parseInt(id));

  return (
    <Modal>
      <ItemDetails clothingItem={item} />
    </Modal>
  );
};

export default ItemPage;
