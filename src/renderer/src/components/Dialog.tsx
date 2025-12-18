import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Button from "@renderer/components/Button/Button";
import { ButtonColor, ButtonSize } from "@renderer/components/Button/Button.types";
import cn from "@renderer/utils/cn";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

Dialog.Trigger = function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

Dialog.Close = function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40",
        className
      )}
      {...props}
    />
  );
}

Dialog.Wrapper = function DialogWrapper({
  className,
  children,
  gap,
  flexDirection = "col",
  width,
  height,
  title,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  gap?: number;
  width?: number;
  flexDirection?: "col" | "row";
  height?: number;
  title?: React.ReactNode;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        aria-describedby={title ? "dialog-title" : undefined}
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 flex translate-x-[-50%] translate-y-[-50%] rounded-[30px] bg-white p-8 duration-200",
          flexDirection === "col" ? "flex-col" : "flex-row",
          className
        )}
        style={{ gap: gap || 32, width: width || 544, height: height || "auto" }}
        {...props}
      >
        <Dialog.Title className={title ? "" : "hidden"}>{title}</Dialog.Title>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

Dialog.Title = function DialogTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("flex flex-col items-center justify-center gap-3 py-6", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
};

Dialog.Header = function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-row items-center justify-between text-2xl font-semibold", className)}
      {...props}
    />
  );
};

Dialog.Footer = function DialogFooter({
  className,
  children,
  layout = "balanced",
  buttonClassName,
  primaryButton,
  secondaryButton,
  buttonSize = "lg",
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  layout?: "balanced" | "unbalanced";
  buttonClassName?: string;
  primaryButton?: {
    color?: ButtonColor;
    className?: string;
    text?: string;
    onClick?: () => void;
    hide?: boolean;
    disabled?: boolean;
  };
  secondaryButton?: {
    color?: ButtonColor;
    className?: string;
    text?: string;
    onClick?: () => void;
    hide?: boolean;
  };
  buttonSize?: ButtonSize;
}) {
  const getButtonSize = () => `button-${buttonSize}`;

  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-row items-center gap-3", className)}
      {...props}
    >
      {children || (
        <>
          {secondaryButton?.hide ? null : (
            <Dialog.Close asChild>
              <Button
                color={secondaryButton?.color ?? "grey"}
                className={cn(
                  getButtonSize(),
                  layout === "balanced" ? "w-full" : "w-[120px]",
                  buttonClassName,
                  secondaryButton?.className ?? ""
                )}
                onClick={secondaryButton?.onClick}
              >
                {secondaryButton?.text ?? "닫기"}
              </Button>
            </Dialog.Close>
          )}
          {primaryButton?.hide ? null : (
            <Button
              color={primaryButton?.color ?? "black"}
              className={cn(getButtonSize(), "w-full", primaryButton?.className ?? "")}
              onClick={primaryButton?.onClick}
              disabled={primaryButton?.disabled}
            >
              {primaryButton?.text ?? "확인"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export { Dialog, DialogOverlay, DialogPortal };
