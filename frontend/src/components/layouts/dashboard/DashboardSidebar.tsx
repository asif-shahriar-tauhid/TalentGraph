"use client";

import { ChevronLeft, ChevronRight, LogOut, X } from "lucide-react";
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
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
  footerNote?: string;
  footerSecurityText?: string;
}

export function DashboardSidebar({
  roleTitle,
  roleBadge,
  roleBadgeClassName,
  navGroups,
  isOpen,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
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
          "fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-shrink-0 flex-col border-r border-border/80 bg-card transition-[transform,width] duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        {/* Brand & Workspace Title */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-border/80",
            isCollapsed ? "justify-center px-2 lg:px-0" : "justify-between px-5",
          )}
        >
          <Link
            href="/"
            className={cn("flex items-center gap-2", isCollapsed && "lg:hidden")}
          >
            <Logo size={32} />
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary lg:hidden cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Role Badge Strip */}
        <div
          className={cn(
            "flex items-center border-b border-border/60 bg-secondary/40 py-2.5",
            isCollapsed ? "justify-center px-2 lg:px-0" : "justify-between px-5",
          )}
        >
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {roleTitle}
            </span>
          )}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] uppercase font-bold tracking-wider",
              roleBadgeClassName ||
                "border-primary/30 bg-primary/10 text-primary",
              isCollapsed && "lg:hidden",
            )}
          >
            {roleBadge}
          </Badge>
        </div>

        {/* Navigation Groups */}
        <div
          className={cn(
            "flex-1 space-y-6 overflow-y-auto py-4",
            isCollapsed ? "px-2 lg:px-1" : "px-3.5",
          )}
        >
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {group.title && !isCollapsed && (
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
                        "group flex items-center rounded-xl py-2 text-xs font-semibold transition-all",
                        isCollapsed
                          ? "justify-center px-0 lg:justify-center"
                          : "justify-between px-3",
                        isActive
                          ? "bg-accent text-accent-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                      title={isCollapsed ? item.label : undefined}
                      aria-label={isCollapsed ? item.label : undefined}
                    >
                      <div
                        className={cn(
                          "flex min-w-0 items-center",
                          isCollapsed ? "justify-center" : "gap-2.5",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!isCollapsed && item.badge !== undefined && (
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
        <div
          className={cn(
            "space-y-3 border-t border-border/80 bg-secondary/20 p-3.5",
            isCollapsed && "lg:flex lg:justify-center",
          )}
        >
          {!isCollapsed && (footerNote || footerSecurityText) && (
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
            className={cn(
              "w-full justify-center gap-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30",
              isCollapsed && "lg:w-9 lg:px-0",
            )}
          >
            <LogOut className="size-3.5" />
            <span className={cn(isCollapsed && "lg:sr-only")}>Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
