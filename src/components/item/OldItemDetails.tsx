"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  deleteUserClothingItemById,
  updateUserClothingItemById,
} from "~/server/serverActions";
import { ClothingCategory, type ClothingItem } from "~/types/global";
import { Button } from "../ui/button";

/**@deprecated  */
const ItemDetails = ({ clothingItem }: { clothingItem: ClothingItem }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: clothingItem.name || "",
    brand: clothingItem.brand || "",
    category: clothingItem.category || "",
  });
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      await updateUserClothingItemById(clothingItem.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
    } finally {
      setIsUpdating(false);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUserClothingItemById(clothingItem.id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setIsDeleting(false);
  };

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
        <div className="flex flex-col items-start gap-2">
          {isEditing ? (
            <>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => handleChange(e)}
                className="w-full border-2 border-black bg-white px-2 py-1 text-sm"
              >
                <option value="">Select Category</option>
                {Object.values(ClothingCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border-2 border-black bg-white px-2 py-1 text-2xl font-bold"
              />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full border-2 border-black bg-white px-2 py-1 text-sm"
              />
            </>
          ) : (
            <>
              <p className="break-words text-sm text-gray-500">
                {clothingItem.category || "No Category"}
              </p>
              <h1 className="break-words text-2xl font-bold">
                {clothingItem.name || "Untitled"}
              </h1>
              <p className="break-words text-sm text-gray-500">
                {clothingItem.brand || "Brand Unknown"}
              </p>
            </>
          )}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSubmit} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  disabled={isUpdating}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </div>
        <div>
          {isDeleting ? (
            <Button disabled variant="destructive">
              Deleting...
            </Button>
          ) : isConfirmingDelete ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs">
                Are you sure you want to delete this item?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="destructive"
              onClick={() => setIsConfirmingDelete(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
