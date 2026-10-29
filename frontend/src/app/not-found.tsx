import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import Logo from "@/asset/svg/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 text-center space-y-6 shadow-xs">
        <div className="flex justify-center">
          <Logo size={40} />
        </div>

        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <FileQuestion className="size-7" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-black text-foreground">Page Not Found</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The evidence or route you are looking for does not exist or has been relocated.
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
