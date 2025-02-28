"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type SavedFit } from "~/consts/types";
import { deleteSavedFitById } from "~/server/serverActions";
import SavedFitCard from "../SavedFitCard";

const SavedFitsPage = ({ savedFits }: { savedFits: SavedFit[] }) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteSavedFitById(id);
      router.refresh();
      toast("Fit deleted successfully");
    } catch (error) {
      console.error("Error deleting fit:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container-page">
      <div className="mb-4 flex flex-row items-center justify-between gap-2 sm:mb-8 sm:gap-4">
        <h1 className="font-chakra text-3xl font-bold">SAVED FITS</h1>
        <p className="font-chakra text-lg font-medium">
          {savedFits.length} fits
        </p>
      </div>

      {savedFits.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="font-chakra text-lg">
            You don&apos;t have any saved fits yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedFits.map((fit) => {
            return (
              <SavedFitCard
                key={fit.id}
                fit={fit}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedFitsPage;
