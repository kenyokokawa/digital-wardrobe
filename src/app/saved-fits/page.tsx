import { getUserSavedFits } from "~/server/queries";
import SavedFitsPage from "./_components/SavedFitsPage";
import { getUserClothingItemById } from "~/server/queries";
import { type SavedFit } from "~/consts/types";

const SavedFitsPageWrapper = async () => {
  const savedFits = await getUserSavedFits();
  
  const fitsWithItems: SavedFit[] = await Promise.all(
    savedFits.map(async (fit) => {
      try {
        const itemsData = await Promise.all(
          fit.itemIds.map(async (id) => await getUserClothingItemById(id))
        );
        return { ...fit, itemsData };
      } catch (error) {
        console.error(`Error fetching items for fit ${fit.id}:`, error);
        return fit;
      }
    })
  );

  return <SavedFitsPage savedFits={fitsWithItems} />;
};

export default SavedFitsPageWrapper;
