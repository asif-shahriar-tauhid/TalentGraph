import { CallToAction } from "@/components/CallToAction";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
}
