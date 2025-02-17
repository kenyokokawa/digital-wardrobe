"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { updateUserClothingItemById } from "~/server/serverActions";
import { ClothingCategory, type ClothingItem } from "~/types/global";
import { Button } from "../ui/button";

const ItemDetails = ({
  clothingItem,
  canEdit,
}: {
  clothingItem: ClothingItem;
  canEdit: boolean;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: clothingItem.name || "",
    brand: clothingItem.brand || "",
    category: clothingItem.category || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
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
  return (
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
      {canEdit && (
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleUpdate} disabled={isUpdating}>
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
      )}
    </div>
  );
};

export default ItemDetails;
