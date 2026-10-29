"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./authProvider";
import QueryProvider from "./queryProvider";
import { ThemeProvider } from "./themeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
