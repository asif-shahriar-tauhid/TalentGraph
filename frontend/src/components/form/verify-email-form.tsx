"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, MailCheck } from "lucide-react";
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
import { useVerifyEmail } from "@/hooks/auth.hooks";
import { getRoleDashboardUrl } from "@/lib/authUtils";
import { VerifyEmailZodSchema } from "@/validation";

function VerifyEmailFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const { mutate: verify, isPending } = useVerifyEmail();

  const form = useForm({
    defaultValues: {
      email: initialEmail,
      otp: "",
    },
    validators: {
      onSubmit: VerifyEmailZodSchema,
    },
    onSubmit: ({ value }) => {
      verify(
        { email: value.email.trim(), otp: value.otp.trim() },
        {
          onSuccess: (res) => {
            const role = res?.data?.user?.role;
            const target = getRoleDashboardUrl(role);
            router.push(target);
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
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center text-xs text-muted-foreground">
        A 6-digit One-Time Password was sent to your email. Enter it below to activate your account.
      </div>

      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
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
                <FieldLabel htmlFor={field.name}>Verification Code (OTP)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="123456"
                  maxLength={6}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className="text-center font-mono text-lg tracking-widest"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending} className="w-full gap-2 mt-2">
          {isPending ? (
            <Spinner>Verifying...</Spinner>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              <span>Verify & Continue</span>
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}

export function VerifyEmailForm() {
  return (
    <Suspense
      fallback={
        <div className="h-48 flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <VerifyEmailFormInner />
    </Suspense>
  );
}
