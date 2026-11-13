"use client";

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
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
  companyStatus?: string;
  companyStatusVerified?: boolean;
  alwaysVisible?: boolean;
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
  companyStatus,
  companyStatusVerified = false,
  alwaysVisible = false,
  navGroups,
  isOpen,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  footerNote,
  footerSecurityText,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user, role, logout, logoutPending } = useAuth();
  const collapsed = isCollapsed;
  const userInitials =
    user?.name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "SR";

  return (
    <>
      {/* Mobile backdrop */}
      {!alwaysVisible && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "z-50 flex h-screen shrink-0 flex-col border-r border-border/80 bg-card transition-[transform,width] duration-300",
          alwaysVisible
            ? cn(
                "sticky top-0 w-16",
                collapsed ? "lg:w-16" : "lg:w-64",
              )
            : cn(
                "fixed top-0 bottom-0 left-0 w-64 lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                collapsed ? "lg:w-16" : "lg:w-64",
              ),
        )}
      >
        {/* Brand & Workspace Title */}
        <div
          className={cn(
            "flex min-h-16 items-center border-b border-border/80",
            collapsed
              ? "justify-center px-2"
              : alwaysVisible
                ? "justify-center px-2 lg:justify-between lg:px-5"
                : "justify-between px-5",
          )}
        >
          <Link
            href="/"
            aria-label="TalentGraph home"
            className={cn(
              "flex items-center gap-2",
              alwaysVisible && "hidden lg:flex",
              collapsed && "hidden",
            )}
          >
            <Logo size={32} />
          </Link>
          {alwaysVisible && (
            <Link
              aria-label="TalentGraph home"
              className={cn(
                "flex items-center justify-center",
                "lg:hidden",
                collapsed && "lg:flex",
              )}
              href="/"
              title="TalentGraph"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#E56218] text-sm font-bold tracking-tight text-white">
                TG
              </span>
            </Link>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "hidden rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:flex",
              alwaysVisible &&
                "absolute right-0 top-[4.5rem] z-10 translate-x-1/2 rounded-full border border-border bg-card p-1.5 shadow-sm",
              alwaysVisible && !collapsed && "right-2 top-4 translate-x-0",
              collapsed && "lg:mx-auto",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-muted-foreground hover:bg-secondary lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {alwaysVisible && (
          <div
            className="border-b border-border/60 bg-secondary/20 px-1 py-2"
          >
            <div className="flex justify-center">
              <span className="shrink-0 whitespace-nowrap rounded border border-orange-500/20 bg-orange-500/10 px-1 py-0.5 text-center text-[9px] font-bold uppercase tracking-wider text-orange-400">
                {roleBadge}
              </span>
            </div>
          </div>
        )}

        {/* Workspace status */}
        {companyStatus ? (
          <div
            className={cn(
              "border-b border-border/60 bg-secondary/40 p-2 lg:px-2",
              alwaysVisible && "px-0",
              collapsed && "lg:px-0",
            )}
          >
            <div
              className={cn(
                "relative flex min-h-9 items-center gap-2 rounded-lg border border-border/70 bg-card px-2",
                alwaysVisible && "justify-center lg:justify-start",
                collapsed && "lg:justify-center",
                alwaysVisible && "px-1 lg:px-2",
                collapsed && "lg:px-1",
              )}
              title={`${companyStatus} — ${companyStatusVerified ? "Verified" : "Pending verification"}`}
              aria-label={`${companyStatus} — ${companyStatusVerified ? "Verified" : "Pending verification"}`}
            >
              {alwaysVisible && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex flex-col items-center gap-1 py-1",
                    !collapsed && "lg:hidden",
                  )}
                >
                  <span className="relative flex size-5 items-center justify-center">
                    <Building2 className="size-4 text-muted-foreground" />
                    <span
                      className={cn(
                        "absolute -right-0.5 -top-0.5 size-2 rounded-full border border-card",
                        companyStatusVerified ? "bg-emerald-500" : "bg-amber-500",
                      )}
                    />
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-center text-[8px] font-semibold uppercase tracking-wider text-zinc-200">
                    WORKSPACE
                  </span>
                </span>
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "relative flex size-2 shrink-0",
                  alwaysVisible && "hidden lg:flex",
                  collapsed && "lg:hidden",
                )}
              >
                <span
                  className={cn(
                    "absolute inline-flex size-full rounded-full opacity-40",
                    companyStatusVerified ? "bg-emerald-500" : "bg-amber-500",
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex size-2 rounded-full",
                    companyStatusVerified ? "bg-emerald-500" : "bg-amber-500",
                  )}
                />
              </span>
              <span
                className={cn(
                  "min-w-0 truncate text-[11px] font-medium text-foreground",
                  alwaysVisible && "hidden lg:block",
                  collapsed && "lg:hidden",
                )}
              >
                {companyStatus}
              </span>
              <span
                className={cn(
                  "ml-auto text-[10px] font-medium",
                  companyStatusVerified
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-400",
                  alwaysVisible && "hidden lg:block",
                  collapsed && "lg:hidden",
                )}
              >
                {companyStatusVerified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center border-b border-border/60 bg-secondary/40 py-2.5",
              collapsed ? "justify-center px-2 lg:px-0" : "justify-between px-5",
            )}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {roleTitle}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                roleBadgeClassName ||
                  "border-primary/30 bg-primary/10 text-primary",
                alwaysVisible && "hidden lg:inline-flex",
                collapsed && "hidden",
              )}
            >
              {roleBadge}
            </Badge>
          </div>
        )}

        {/* Navigation Groups */}
        <nav
          aria-label="Dashboard navigation"
          className={cn(
            "flex-1 space-y-6 overflow-y-auto py-4",
            alwaysVisible
              ? "px-1 lg:px-3.5"
              : collapsed
                ? "px-2 lg:px-1"
                : "px-3.5",
          )}
        >
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {group.title && !collapsed && (
                <div
                  className={cn(
                    "px-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80",
                    alwaysVisible && "hidden lg:block",
                  )}
                >
                  {group.title}
                </div>
              )}
              <div className={cn("space-y-1", alwaysVisible && "lg:space-y-1.5")}>
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
                        "group relative flex min-h-11 items-center rounded-xl py-2 text-xs font-semibold transition-all",
                        alwaysVisible
                          ? "justify-center px-0 lg:justify-start lg:px-3"
                          : collapsed
                            ? "justify-center px-0 lg:justify-center"
                            : "justify-between px-3",
                        isActive
                          ? "bg-[#F97316] text-white shadow-xs font-bold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                      title={
                        collapsed || alwaysVisible ? item.label : undefined
                      }
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div
                        className={cn(
                          "flex min-w-0 items-center",
                          alwaysVisible
                            ? "justify-center lg:justify-start lg:gap-2.5"
                            : collapsed
                              ? "justify-center"
                              : "gap-2.5",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isActive
                              ? "text-white"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        {!collapsed && (
                          <span
                            className={cn(
                              "truncate",
                              alwaysVisible && "hidden lg:inline",
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!collapsed && item.badge !== undefined && (
                        <span
                          className={cn(
                            "rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary",
                            alwaysVisible && "hidden lg:inline-flex",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {alwaysVisible &&
                        (item.indicator ||
                          (typeof item.badge === "number" && item.badge > 0) ||
                          (typeof item.badge === "string" &&
                            Number(item.badge) > 0)) && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute right-1 top-1 size-1.5 rounded-full bg-[#F97316]",
                            isActive && "bg-white",
                            "lg:hidden",
                          )}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div
          className={cn(
            "border-t border-border/80 bg-secondary/20 p-2.5 lg:p-3.5",
            alwaysVisible
              ? "flex flex-col items-center gap-2 lg:items-stretch"
              : cn("space-y-3", collapsed && "lg:flex lg:justify-center"),
          )}
        >
          {!collapsed && (footerNote || footerSecurityText) && (
            <div
              className={cn(
                "px-1 text-[10px] leading-relaxed text-muted-foreground",
                alwaysVisible && "hidden lg:block",
              )}
            >
              {footerNote && <p className="font-semibold text-foreground">{footerNote}</p>}
              {footerSecurityText && <p className="opacity-80 mt-0.5">{footerSecurityText}</p>}
            </div>
          )}
          {alwaysVisible && (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-2",
                !collapsed && "lg:flex-row lg:justify-start",
                collapsed && "lg:flex-col lg:justify-center",
              )}
            >
              <div
                aria-label={user?.name || "Recruiter profile"}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#3A3A40] bg-[#27272B] text-xs font-semibold text-white"
                title={user?.name || "Recruiter profile"}
              >
                {userInitials}
              </div>
              <div
                className={cn(
                  "min-w-0 flex-1",
                  collapsed && "hidden",
                  alwaysVisible && "hidden lg:block",
                )}
              >
                <p className="truncate text-[11px] font-semibold text-foreground">
                  {user?.name || "Recruiter"}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {role || roleTitle}
                </p>
              </div>
              <Button
                aria-label="Sign out"
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                disabled={logoutPending}
                className="size-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                title="Sign out"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          )}
          {!alwaysVisible && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              disabled={logoutPending}
              className={cn(
                "w-full justify-center gap-2 text-xs text-muted-foreground hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive",
                collapsed && "lg:w-9 lg:px-0",
              )}
            >
              <LogOut className="size-3.5" />
              <span className={cn(collapsed && "lg:sr-only")}>Sign Out</span>
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
