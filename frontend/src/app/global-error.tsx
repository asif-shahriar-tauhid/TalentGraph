"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global fatal error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen w-full items-center justify-center p-4 bg-background font-sans text-foreground">
        <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center space-y-6 shadow-xs">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-7" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-foreground">Critical System Error</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A fatal application exception was caught.
            </p>
          </div>

          <Button
            variant="default"
            onClick={() => reset()}
            className="w-full justify-center gap-2"
          >
            <RotateCcw className="size-4" />
            <span>Restart Application</span>
          </Button>
        </div>
      </body>
    </html>
  );
}
