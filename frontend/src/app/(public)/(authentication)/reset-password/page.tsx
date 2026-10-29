import { ResetPasswordForm } from "@/components/form/reset-password-form";
import { AuthLayout } from "@/components/layouts/public";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Set a new password for your account"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
