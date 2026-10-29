import { RegisterForm } from "@/components/form/register-form";
import { AuthLayout } from "@/components/layouts/public";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join TalentGraph as a Candidate or Recruiter"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
