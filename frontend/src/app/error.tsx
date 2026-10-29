"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center space-y-6 shadow-xs">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertTriangle className="size-7" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error.message || "An unexpected error occurred while processing your request."}
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => reset()}
          className="w-full justify-center gap-2"
        >
          <RotateCcw className="size-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </div>
  );
}
