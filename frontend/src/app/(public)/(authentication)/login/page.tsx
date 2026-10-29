import { LoginForm } from "@/components/form/login-form";
import { AuthLayout } from "@/components/layouts/public";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your TalentGraph workspace"
    >
      <LoginForm />
    </AuthLayout>
  );
}
