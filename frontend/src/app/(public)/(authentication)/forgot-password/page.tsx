import { ForgotPasswordForm } from "@/components/form/forgot-password-form";
import { AuthLayout } from "@/components/layouts/public";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Request a 6-digit recovery OTP code"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
