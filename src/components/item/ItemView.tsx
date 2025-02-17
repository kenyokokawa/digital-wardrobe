import { type ClothingItem } from "~/types/global";

import ItemDelete from "./ItemDelete";
import ItemDeleteWrapper from "./ItemDeleteWrapper";
import ItemDetails from "./ItemDetails";

const ItemView = ({ clothingItem }: { clothingItem: ClothingItem }) => {
  return (
    <div className="relative flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-12">
      <div className="relative aspect-square w-full max-w-lg shrink-0">
        <img
          src={clothingItem.imgUrl}
          alt={clothingItem.name || "Clothing item"}
          className="w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        <ItemDetails clothingItem={clothingItem} />
        <ItemDeleteWrapper>
          <ItemDelete clothingItem={clothingItem} />
        </ItemDeleteWrapper>
      </div>
    </div>
  );
};

export default ItemView;
