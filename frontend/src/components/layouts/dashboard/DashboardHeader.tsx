"use client";

import { LogOut, Menu, UserCheck } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

interface DashboardHeaderProps {
  roleTitle?: string;
  onToggleSidebar?: () => void;
}

export function DashboardHeader({
  roleTitle,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const { user, role, logout, logoutPending } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground lg:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="size-4" />
        </button>
        {roleTitle && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </span>
            <span className="text-xs text-muted-foreground/60">•</span>
            <span className="text-xs font-bold text-foreground">
              {roleTitle}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="h-4 w-px bg-border/80 mx-1 hidden sm:block" />

        <div className="flex items-center gap-2.5">
          <UserAvatar
            name={user?.name}
            imageUrl={user?.imageUrl}
            size="md"
          />
          <div className="hidden md:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-foreground line-clamp-1">
                {user?.name || "Authenticated User"}
              </span>
              <UserCheck className="size-3 text-emerald-500" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {role || "GUEST"}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => logout()}
          disabled={logoutPending}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Sign out"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
