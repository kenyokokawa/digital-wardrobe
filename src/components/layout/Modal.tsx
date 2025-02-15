"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

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
        className="relative flex h-5/6 max-h-[800px] w-5/6 max-w-5xl flex-col items-center justify-start border-none bg-white p-4 sm:p-8"
        onClose={onDismiss}
      >
        <div className="flex w-full flex-row justify-end">
          <button
            onClick={onDismiss}
            className="flex h-8 w-8 items-center justify-center border-2 border-red-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
