"use client";

import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { UploadButton } from "~/utils/uploadthing";

const ImageUpload = () => {
  const router = useRouter();
  return (
    <div>
      <SignedIn>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            // alert("Upload Completed");
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`Error uploading image: ${error.message}`);
          }}
          content={{
            button: (
              <button className="rounded-none bg-green-500 font-chakra text-white">
                Add items
              </button>
            ),
          }}
          className="ut-button:bg-green-500 ut-button:rounded-none ut-button:ut-readying:bg-green-800 ut-allowed-content:hidden"
        />
      </SignedIn>
    </div>
  );
};

export default ImageUpload;
