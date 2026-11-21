import { CallToAction } from "@/components/CallToAction";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  return (
    <div className="flex min-w-0 flex-col [--landing-navbar-height:53px]">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
}
