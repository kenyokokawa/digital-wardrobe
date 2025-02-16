"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import XIcon from "../icons/XIcon";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70">
      <dialog
        ref={dialogRef}
        className="relative flex max-h-[800px] w-5/6 max-w-5xl flex-col items-center justify-start border-none bg-white px-4 py-2 sm:p-8"
        onClose={onDismiss}
      >
        <div className="mb-2 flex w-full flex-row justify-end">
          <button
            onClick={onDismiss}
            className="flex p-1 items-center justify-center border-[3px] border-red-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <XIcon size={20} color="red" />
          </button>
        </div>
        {children}
        <div className="h-8 w-full" />
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
