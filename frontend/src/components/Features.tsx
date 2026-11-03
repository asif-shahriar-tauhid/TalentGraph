import {
  ArrowRight,
  CheckCircle,
  Code2,
  Users,
} from "lucide-react";
import Link from "next/link";

const candidateBenefits = [
  {
    title: "Reusable SkillGraph",
    description:
      "Build an evidence-backed profile and reuse it when applying to technical roles.",
  },
  {
    title: "Evidence from selected repositories",
    description:
      "Connect selected GitHub repositories to show genuine engineering contributions.",
  },
  {
    title: "Objective skill context",
    description:
      "Review skill evidence and available cohort context for each opportunity.",
  },
  {
    title: "Mobile assessments",
    description:
      "Complete timed technical assessments through the native mobile companion.",
  },
];

const recruiterBenefits = [
  {
    title: "Verified company onboarding",
    description:
      "Company and recruiter affiliation review helps establish who is posting roles.",
  },
  {
    title: "Transparent weighted criteria",
    description:
      "Set explicit skill weights that total 100% and calculate a deterministic match.",
  },
  {
    title: "Inspect source evidence",
    description:
      "Follow evidence to repository references, commit hashes, and relevant code lines.",
  },
  {
    title: "Human integrity review",
    description:
      "Assessment integrity clues support review; they are not automatic ban verdicts.",
  },
];

const audiences = [
  {
    title: "For Candidates",
    subtitle: "Show the work behind your skills",
    icon: Code2,
    action: "Build Candidate SkillGraph",
    href: "/register",
    benefits: candidateBenefits,
  },
  {
    title: "For Recruiters",
    subtitle: "Evaluate talent with inspectable evidence",
    icon: Users,
    action: "View Recruiter Plans",
    href: "/pricing",
    benefits: recruiterBenefits,
  },
];

export function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="border-b border-[#3F3F46]/70 bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0D0D0F]"
      id="roles"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#D4621A]">
            Tailored ecosystem
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight text-[#18181B] sm:text-3xl dark:text-[#F5F5F5]"
            id="features-title"
          >
            Built for two rigorous audiences
          </h2>
          <p className="text-sm leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
            Evidence helps candidates demonstrate their engineering work and
            gives recruiters a clearer, more transparent way to evaluate fit.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {audiences.map(({ title, subtitle, icon: Icon, action, href, benefits }) => (
            <article
              className="flex h-full flex-col rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-sm sm:p-8 dark:border-[#3F3F46] dark:bg-[#19191C]"
              key={title}
            >
              <div className="mb-6 flex items-start gap-4 border-b border-[#E4E4E7] pb-5 dark:border-[#3F3F46]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#D4621A]/20 bg-[#D4621A]/10 text-[#D4621A]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[#18181B] dark:text-[#F5F5F5]">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-[#71717A] dark:text-[#A1A1AA]">
                    {subtitle}
                  </p>
                </div>
              </div>

              <ul className="flex-1 space-y-4">
                {benefits.map(({ title: benefitTitle, description }) => (
                  <li className="flex items-start gap-3" key={benefitTitle}>
                    <CheckCircle
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[#D4621A]"
                    />
                    <p className="text-sm leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                      <span className="font-semibold text-[#18181B] dark:text-[#F5F5F5]">
                        {benefitTitle}:{" "}
                      </span>
                      {description}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] ${
                  title === "For Recruiters"
                    ? "bg-[#D4621A] text-[#18181B] hover:bg-[#E47735]"
                    : "border border-[#E4E4E7] text-[#18181B] hover:bg-[#F4F4F5] dark:border-[#3F3F46] dark:text-[#F5F5F5] dark:hover:bg-[#252528]"
                }`}
                href={href}
              >
                {action}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
