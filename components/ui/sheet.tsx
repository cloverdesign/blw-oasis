"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root data-slot="sheet" {...props} />
  )
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
  )
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close data-slot="sheet-close" {...props} />
  )
}

function SheetPortal({
  container,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal> & {
  container?: HTMLElement | null
}) {
  return (
    <DialogPrimitive.Portal
      data-slot="sheet-portal"
      container={container}
      {...props}
    />
  )
}

function SheetOverlay({
  className,
  contained,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  contained?: boolean
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/50",
        contained ? "absolute z-[1000]" : "fixed z-50",
        className
      )}
      {...props}
    />
  )
}

const sheetSideVariants = {
  bottom:
    "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom inset-x-0 bottom-0 top-auto border-t rounded-t-2xl",
  left: "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left inset-y-0 left-0 h-full w-3/4 border-r rounded-l-2xl sm:max-w-sm",
  right:
    "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right inset-y-0 right-0 h-full w-3/4 border-l rounded-r-2xl sm:max-w-sm",
  top: "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top inset-x-0 top-0 border-b rounded-b-2xl",
}

function SheetContent({
  side = "right",
  className,
  children,
  showCloseButton = true,
  container,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  container?: HTMLElement | null
}) {
  const contained = !!container
  return (
    <SheetPortal container={container}>
      <SheetOverlay contained={contained} />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex flex-col gap-4 shadow-lg duration-200 outline-none",
          contained ? "absolute z-[1000]" : "fixed z-50",
          sheetSideVariants[side],
          side === "bottom" && "max-h-[85vh]",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="sheet-close"
            className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-2 px-6 pt-6 text-left",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
