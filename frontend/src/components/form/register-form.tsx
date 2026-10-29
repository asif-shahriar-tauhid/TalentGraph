"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
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
import { useRegister } from "@/hooks/auth.hooks";
import { RegisterZodSchema } from "@/validation";

export function RegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "RECRUITER" as "RECRUITER" | "CANDIDATE",
    },
    validators: {
      onSubmit: RegisterZodSchema,
    },
    onSubmit: ({ value }) => {
      register(
        {
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password,
          role: value.role,
        },
        {
          onSuccess: () => {
            router.push(
              `/account-verify?email=${encodeURIComponent(value.email.trim())}`,
            );
          },
        },
      );
    },
  });

  const handleGithubRegister = async () => {
    try {
      setIsGithubLoading(true);
      const res = await getGithubAuthUrl();
      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch {
      gooeyToast.error("Failed to initiate GitHub registration");
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Candidate Recommendation: GitHub OAuth */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-center space-y-2">
        <p className="text-xs font-semibold text-foreground">
          Are you a Developer / Candidate?
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Candidates authenticate instantly via GitHub to sync repositories and evidence.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGithubRegister}
          disabled={isGithubLoading || isPending}
          className="w-full justify-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
        >
          {isGithubLoading ? (
            <Spinner className="size-3.5" />
          ) : (
            <GithubIcon className="size-3.5" />
          )}
          <span>Sign Up with GitHub</span>
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/80" />
        <span className="absolute bg-card px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or recruiter email registration
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Sarah Connor"
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

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Work Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="sarah@techcorp.io"
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
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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

          <form.Field name="role">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => field.handleChange("RECRUITER")}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      field.state.value === "RECRUITER"
                        ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>Recruiter</span>
                    <span className="text-[10px] font-normal opacity-80">
                      Hire talent
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => field.handleChange("CANDIDATE")}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      field.state.value === "CANDIDATE"
                        ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>Candidate</span>
                    <span className="text-[10px] font-normal opacity-80">
                      Show evidence
                    </span>
                  </button>
                </div>
              </Field>
            )}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending || isGithubLoading}
            className="w-full gap-2 mt-2"
          >
            {isPending ? (
              <Spinner>Creating Account...</Spinner>
            ) : (
              <>
                <UserPlus className="size-4" />
                <span>Create Account</span>
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="pt-2 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Sign In</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
