"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const ItemDeleteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  return (
    <div>
      {isConfirmingDelete ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs">Are you sure you want to delete this item?</p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsConfirmingDelete(false)}
            >
              Cancel
            </Button>
            {children}
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
  );
};

export default ItemDeleteWrapper;
