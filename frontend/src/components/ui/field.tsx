import type {
  HTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function FieldGroup({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4 w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function Field({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function FieldLabel({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-xs font-semibold text-foreground tracking-wide",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

function getErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return err ? String(err) : "";
}

export function FieldError({
  className,
  errors,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { errors?: ReadonlyArray<unknown> }) {
  if (!errors?.length && !children) return null;

  return (
    <p
      className={cn(
        "text-[11px] font-medium text-destructive transition-all animate-in fade-in-50",
        className,
      )}
      {...props}
    >
      {children || errors?.map(getErrorMessage).filter(Boolean).join(", ")}
    </p>
  );
}
