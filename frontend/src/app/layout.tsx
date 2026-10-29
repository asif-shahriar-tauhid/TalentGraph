import type { Metadata } from "next";
import "./globals.css";
import { GooeyToaster } from "@/components/ui/goey-toaster";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "TalentGraph | Evidence-Based Technical Recruitment",
  description:
    "Don't just claim a skill. Prove it. AI-assisted, evidence-grounded technical hiring connecting verified GitHub code, candidate CVs, and technical assessments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased font-sans"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("app-theme");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
          <GooeyToaster />
        </Providers>
      </body>
    </html>
  );
}
