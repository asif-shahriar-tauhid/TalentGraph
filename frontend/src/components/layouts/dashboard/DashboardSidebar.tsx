"use client";

import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/asset/svg/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/authProvider";
import type { NavGroup } from "./dashboard.types";

interface DashboardSidebarProps {
  roleTitle: string;
  roleBadge: string;
  roleBadgeClassName?: string;
  navGroups: NavGroup[];
  isOpen?: boolean;
  onClose?: () => void;
  footerNote?: string;
  footerSecurityText?: string;
}

export function DashboardSidebar({
  roleTitle,
  roleBadge,
  roleBadgeClassName,
  navGroups,
  isOpen,
  onClose,
  footerNote,
  footerSecurityText,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout, logoutPending } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-border/80 bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand & Workspace Title */}
        <div className="flex h-16 items-center justify-between border-b border-border/80 px-5">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={32} />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary lg:hidden cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Role Badge Strip */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-5 py-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {roleTitle}
          </span>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] uppercase font-bold tracking-wider",
              roleBadgeClassName ||
                "border-primary/30 bg-primary/10 text-primary",
            )}
          >
            {roleBadge}
          </Badge>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {group.title && (
                <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  const isActive = item.isActive
                    ? item.isActive(pathname)
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={() => onClose?.()}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                        isActive
                          ? "bg-accent text-accent-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-border/80 p-3.5 space-y-3 bg-secondary/20">
          {(footerNote || footerSecurityText) && (
            <div className="px-1 text-[10px] text-muted-foreground leading-relaxed">
              {footerNote && <p className="font-semibold text-foreground">{footerNote}</p>}
              {footerSecurityText && <p className="opacity-80 mt-0.5">{footerSecurityText}</p>}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            disabled={logoutPending}
            className="w-full justify-center gap-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
