import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "../ui/tooltip";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              toast: "rounded-none border-2 border-zinc-400",
            },
          }}
        />
      </TooltipProvider>
    </>
  );
};

export default LayoutWrapper;
