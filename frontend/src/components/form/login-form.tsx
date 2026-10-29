"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { getGithubAuthUrl, getMe } from "@/api/auth.api";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/auth.hooks";
import {
  decodeJwtPayload,
  resolvePostAuthUrl,
  syncClientAuthCookie,
} from "@/lib/authUtils";
import { LoginZodSchema } from "@/validation";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useLogin();
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginZodSchema,
    },
    onSubmit: ({ value }) => {
      login(
        { email: value.email.trim(), password: value.password },
        {
          onSuccess: async (res) => {
            const token = res?.data?.accessToken;
            if (token) syncClientAuthCookie(token);

            let tokenRole = decodeJwtPayload(token)?.role;
            try {
              const meRes = await getMe();
              queryClient.setQueryData(["user"], meRes);
              if (meRes?.data?.role) tokenRole = meRes.data.role;
            } catch {}
            queryClient.invalidateQueries({ queryKey: ["user"] });

            const targetUrl = resolvePostAuthUrl({
              accessToken: token,
              userRole: tokenRole,
              redirectUrl,
            });
            router.push(targetUrl);
            router.refresh();
          },
        },
      );
    },
  });

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      const res = await getGithubAuthUrl(redirectUrl || undefined);
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        gooeyToast.error("Failed to initiate GitHub Sign In");
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      gooeyToast.error("GitHub Login Error", {
        description: error?.message || "Could not retrieve authorization link.",
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* GitHub OAuth Primary CTA for Candidates */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGithubLogin}
        disabled={isGithubLoading || isPending}
        className="w-full justify-center gap-2 h-10 border-border bg-card hover:bg-secondary font-semibold"
      >
        {isGithubLoading ? (
          <Spinner className="size-4" />
        ) : (
          <GithubIcon className="size-4 text-foreground" />
        )}
        <span>Continue with GitHub</span>
      </Button>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/80" />
        <span className="absolute bg-card px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or sign in with email
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
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
                    placeholder="recruiter@company.com"
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

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    placeholder="••••••••"
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

          <Button
            type="submit"
            disabled={isPending || isGithubLoading}
            className="w-full gap-2 mt-2"
          >
            {isPending ? (
              <Spinner>Signing In...</Spinner>
            ) : (
              <>
                <KeyRound className="size-4" />
                <span>Sign In with Password</span>
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="pt-2 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Register here</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="h-48 flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
