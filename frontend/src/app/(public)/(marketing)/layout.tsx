import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layouts/public";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="frontend-type-scale flex min-h-screen min-w-0 flex-col bg-background">
      <Navbar />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
