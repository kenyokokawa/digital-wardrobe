"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CATEGORY_ITEMS } from "~/consts/consts";
import { type ClothingItem } from "~/consts/types";
import { updateUserClothingItemById } from "~/server/serverActions";
import { Button } from "../ui/button";
import Combobox from "../ui/combobox";
import { Input } from "../ui/input";

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
          {/* <select
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e)}
            className="w-full border-2 border-black bg-white px-2 py-1 text-sm"
          >
            <option value="">Select Category</option>
            {CATEGORY_ITEMS.map((category) => (
              <option key={category.id} value={category.id}>
                {category.id}
              </option>
            ))}
          </select> */}
          <Combobox
            value={formData.category}
            setValue={(value) => setFormData({ ...formData, category: value })}
            options={CATEGORY_ITEMS.map((category) => category.id)}
          />
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            size="lg"
          />
          <Input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            size="sm"
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
