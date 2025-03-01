import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteUserClothingItemById } from "~/server/serverActions";
import { type ClothingItem } from "~/consts/types";
import { Button } from "../ui/button";
const ItemDelete = async ({ clothingItem }: { clothingItem: ClothingItem }) => {
  return (
    <form
      action={async () => {
        "use server";
        await deleteUserClothingItemById(clothingItem.id);
        revalidatePath("/");
        redirect("/");
      }}
    >
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
};

export default ItemDelete;
