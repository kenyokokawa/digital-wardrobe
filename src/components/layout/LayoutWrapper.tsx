import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "../ui/tooltip";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider delayDuration={300}>
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
