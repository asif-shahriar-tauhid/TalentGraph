"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/auth.hooks";
import { ForgotPasswordZodSchema } from "@/validation";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { mutate: sendOtp, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: ForgotPasswordZodSchema,
    },
    onSubmit: ({ value }) => {
      sendOtp(value.email.trim(), {
        onSuccess: () => {
          router.push(
            `/reset-password?email=${encodeURIComponent(value.email.trim())}`,
          );
        },
      });
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
      <p className="text-xs text-muted-foreground leading-relaxed">
        Enter your registered email address and we will dispatch a 6-digit OTP code to reset your password.
      </p>

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
                  placeholder="name@company.com"
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
            <Spinner>Sending OTP...</Spinner>
          ) : (
            <>
              <Send className="size-4" />
              <span>Send Reset OTP</span>
            </>
          )}
        </Button>
      </FieldGroup>

      <div className="pt-2 text-center text-xs text-muted-foreground">
        <Link
          href="/login"
          className="font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </form>
  );
}
