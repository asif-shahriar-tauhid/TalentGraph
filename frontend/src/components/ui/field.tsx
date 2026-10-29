import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
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

export function FieldError({
  className,
  errors,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { errors?: Array<any> }) {
  if (!errors?.length && !children) return null;

  return (
    <p
      className={cn(
        "text-[11px] font-medium text-destructive transition-all animate-in fade-in-50",
        className,
      )}
      {...props}
    >
      {children ||
        errors
          ?.map((err) =>
            typeof err === "string"
              ? err
              : err?.message || (err ? String(err) : ""),
          )
          .filter(Boolean)
          .join(", ")}
    </p>
  );
}
