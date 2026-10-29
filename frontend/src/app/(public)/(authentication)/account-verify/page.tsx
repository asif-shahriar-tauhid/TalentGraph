import { VerifyEmailForm } from "@/components/form/verify-email-form";
import { AuthLayout } from "@/components/layouts/public";

export default function AccountVerifyPage() {
  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Enter the 6-digit verification code"
    >
      <VerifyEmailForm />
    </AuthLayout>
  );
}
