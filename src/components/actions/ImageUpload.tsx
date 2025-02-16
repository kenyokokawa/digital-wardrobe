"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { useEffect } from "react";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);
  };

  return {
    inputProps: {
      onChange,
      multiple: true,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function ImageUpload() {
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast("Uploading...", {
        duration: 100000,
        id: "upload-begin",
      });
    },
    onUploadError(error) {
      toast.dismiss("upload-begin");
      toast.error("Upload failed");
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("Upload complete!");

      router.refresh();
    },
  });

  return (
    <div>
      <label
        htmlFor="upload-button"
        className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-green-500 px-4 py-2 font-chakra text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      >
        Add item
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
