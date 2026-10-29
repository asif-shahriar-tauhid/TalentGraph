import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Logo from "@/asset/svg/Logo";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center space-y-6 shadow-xs">
        <div className="flex justify-center">
          <Logo size={40} />
        </div>

        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
          <ShieldAlert className="size-7" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-foreground">Access Restricted</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your current account credentials do not hold the required clearance level to access this resource.
          </p>
        </div>

        <Button
          variant="default"
          render={<Link href="/" />}
          nativeButton={false}
          className="w-full justify-center gap-2"
        >
          <ArrowLeft className="size-4" />
          <span>Return Home</span>
        </Button>
      </div>
    </div>
  );
}
