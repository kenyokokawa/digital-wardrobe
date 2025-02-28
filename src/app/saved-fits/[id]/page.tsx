import { notFound, redirect } from "next/navigation";
import { getSavedFitById } from "~/server/queries";

const SavedFitPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const savedFit = await getSavedFitById(id);

  if (!savedFit) {
    notFound();
  }

  redirect(
    `/fit-check?items=${savedFit.itemIds.join(",")}&fitId=${savedFit.id}`,
  );
};

export default SavedFitPage;
