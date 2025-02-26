import { type ClothingItem } from "~/consts/types";

import ItemDelete from "./ItemDelete";
import ItemDeleteWrapper from "./ItemDeleteWrapper";
import ItemDetails from "./ItemDetails";
import { auth } from "@clerk/nextjs/server";

const ItemView = async ({ clothingItem }: { clothingItem: ClothingItem }) => {
  const user = await auth();
  const canEdit = user.userId === clothingItem.userId;
  return (
    <div className="relative flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-12">
      <div className="relative aspect-square w-full sm:max-w-lg">
        <img
          src={clothingItem.imgUrl}
          alt={clothingItem.name || "Clothing item"}
          className="w-full max-w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between gap-4">
        <ItemDetails clothingItem={clothingItem} canEdit={canEdit} />
        {canEdit && (
          <ItemDeleteWrapper>
            <ItemDelete clothingItem={clothingItem} />
          </ItemDeleteWrapper>
        )}
      </div>
    </div>
  );
};

export default ItemView;
