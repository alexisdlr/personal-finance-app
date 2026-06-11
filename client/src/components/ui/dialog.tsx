"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 rounded-12 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-5 px-5 py-6 text-sm ring-1 duration-100 outline-none sm:max-w-140 sm:p-8",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <button className="group focus-visible:outline-primary absolute top-6.5 right-4.5 cursor-pointer p-0 transition-colors focus-visible:outline-offset-2 sm:top-10 sm:right-7.5">
              <span className="text-muted-foreground group-hover:text-primary">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.28 9.28L13.81 12.75L17.28 16.22C17.3537 16.2887 17.4128 16.3715 17.4538 16.4635C17.4948 16.5555 17.5168 16.6548 17.5186 16.7555C17.5204 16.8562 17.5018 16.9562 17.4641 17.0496C17.4264 17.143 17.3703 17.2278 17.299 17.299C17.2278 17.3703 17.143 17.4264 17.0496 17.4641C16.9562 17.5018 16.8562 17.5204 16.7555 17.5186C16.6548 17.5168 16.5555 17.4948 16.4635 17.4538C16.3715 17.4128 16.2887 17.3537 16.22 17.28L12.75 13.81L9.28 17.28C9.13783 17.4125 8.94978 17.4846 8.75548 17.4812C8.56118 17.4777 8.3758 17.399 8.23838 17.2616C8.10097 17.1242 8.02226 16.9388 8.01883 16.7445C8.0154 16.5502 8.08753 16.3622 8.22001 16.22L11.69 12.75L8.22001 9.28C8.08753 9.13782 8.0154 8.94978 8.01883 8.75548C8.02226 8.56118 8.10097 8.37579 8.23838 8.23838C8.3758 8.10097 8.56118 8.02225 8.75548 8.01882C8.94978 8.0154 9.13783 8.08752 9.28 8.22L12.75 11.69L16.22 8.22C16.3622 8.08752 16.5502 8.0154 16.7445 8.01882C16.9388 8.02225 17.1242 8.10097 17.2616 8.23838C17.399 8.37579 17.4778 8.56118 17.4812 8.75548C17.4846 8.94978 17.4125 9.13782 17.28 9.28ZM25.5 12.75C25.5 15.2717 24.7522 17.7368 23.3512 19.8335C21.9503 21.9302 19.959 23.5644 17.6292 24.5295C15.2995 25.4945 12.7359 25.747 10.2626 25.255C7.78935 24.7631 5.51751 23.5487 3.73439 21.7656C1.95127 19.9825 0.736955 17.7107 0.244993 15.2374C-0.246968 12.7641 0.00552416 10.2005 0.970541 7.87079C1.93556 5.54103 3.56976 3.54975 5.66648 2.14876C7.76321 0.747774 10.2283 0 12.75 0C16.1303 0.00396981 19.371 1.34854 21.7612 3.73877C24.1515 6.129 25.496 9.36971 25.5 12.75ZM24 12.75C24 10.525 23.3402 8.34989 22.104 6.49983C20.8679 4.64978 19.1109 3.20784 17.0552 2.35635C14.9995 1.50487 12.7375 1.28208 10.5552 1.71617C8.37295 2.15025 6.36839 3.22171 4.79505 4.79505C3.22171 6.36839 2.15025 8.37295 1.71617 10.5552C1.28209 12.7375 1.50487 14.9995 2.35636 17.0552C3.20785 19.1109 4.64979 20.8679 6.49984 22.104C8.34989 23.3402 10.525 24 12.75 24C15.7327 23.9967 18.5922 22.8104 20.7013 20.7013C22.8104 18.5922 23.9967 15.7327 24 12.75Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <span className="sr-only">Close</span>
            </button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div data-slot="dialog-footer" className={cn("", className)} {...props}>
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("sm:text-32 text-xl font-bold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
