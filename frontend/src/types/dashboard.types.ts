import type { ComponentType, ReactNode } from "react";
import type { UserRole } from "./auth.types";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  isActive?: (pathname: string) => boolean;
  badge?: string | number;
  description?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface DashboardShellProps {
  userRole: UserRole | string;
  roleTitle: string;
  roleBadge: string;
  roleBadgeClassName?: string;
  footerNote?: string;
  footerSecurityText?: string;
  navGroups: NavGroup[];
  children: ReactNode;
}
