"use client";

import { useForm } from "@tanstack/react-form";
import { Check, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useResetPassword } from "@/hooks/auth.hooks";
import { ResetPasswordZodSchema } from "@/validation";

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const { mutate: reset, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: {
      email: initialEmail,
      otp: "",
      newPassword: "",
    },
    validators: {
      onSubmit: ResetPasswordZodSchema,
    },
    onSubmit: ({ value }) => {
      reset(
        {
          email: value.email.trim(),
          otp: value.otp.trim(),
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            router.push("/login");
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Account Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending || Boolean(initialEmail)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="otp">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>6-Digit OTP</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="123456"
                  maxLength={6}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className="font-mono text-center tracking-widest"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Min 8 chars, 1 uppercase, 1 special"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending} className="w-full gap-2 mt-2">
          {isPending ? (
            <Spinner>Updating Password...</Spinner>
          ) : (
            <>
              <Check className="size-4" />
              <span>Update Password</span>
            </>
          )}
        </Button>
      </FieldGroup>

      <div className="pt-2 text-center text-xs text-muted-foreground">
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Return to Sign In
        </Link>
      </div>
    </form>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <div className="h-48 flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ResetPasswordFormInner />
    </Suspense>
  );
}
