import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-6 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Loading TalentGraph...
        </span>
      </div>
    </div>
  );
}
