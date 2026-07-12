import * as React from "react";
import { cn } from "@/lib/utils";

const SheetContext = React.createContext({ open: false, onOpenChange: () => {} });

function Sheet({ open = false, onOpenChange, children }) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetContent({ side = "right", className, children, ...props }) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20" onClick={() => onOpenChange?.(false)}>
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-[270px] flex-col border-r bg-background shadow-lg",
          side === "right" ? "right-0" : "left-0",
          className
        )}
        onClick={(event) => event.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function SheetHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}

function SheetTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

export { Sheet, SheetContent, SheetHeader, SheetTitle };
