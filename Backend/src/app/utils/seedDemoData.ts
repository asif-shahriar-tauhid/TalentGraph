import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";
import { seedSuperAdmin } from "./seed";

const DEMO_PASSWORD = "TestPass@123";

const findOrCreateCompany = async (data: {
  name: string;
  description: string;
  website: string;
  verificationStatus: "VERIFIED" | "PENDING";
  subscriptionTier: "FREE" | "PRO" | "TEAM" | "PREMIUM";
}) => {
  const existing = await prisma.company.findFirst({
    where: { name: data.name },
  });
  if (existing) {
    return prisma.company.update({
      where: { id: existing.id },
      data,
    });
  }
  return prisma.company.create({ data });
};

const main = async () => {
  try {
    await prisma.$connect();
    await seedSuperAdmin();

    const hashedPassword = await bcrypt.hash(
      DEMO_PASSWORD,
      config.bcrypt_salt_rounds,
    );

    // 1. Seed Demo Companies
    const verifiedCompany = await findOrCreateCompany({
      name: "TalentGraph Labs Ltd.",
      description:
        "Evidence-first engineering team building developer assessment and hiring tools.",
      website: "https://talentgraph-labs.example.com",
      verificationStatus: "VERIFIED",
      subscriptionTier: "PRO",
    });

    const pendingCompany = await findOrCreateCompany({
      name: "Dhaka Cloud Systems",
      description: "Distributed backend infrastructure and fintech tooling.",
      website: "https://dhakacloud.example.com",
      verificationStatus: "PENDING",
      subscriptionTier: "FREE",
    });

    // 2. Credential Candidate (ACTIVE, verified, rich SkillGraph & GitHub repos)
    const credCandidate = await prisma.user.upsert({
      where: { email: "candidate.cred@talentgraph.test" },
      update: {
        name: "Ayesha Rahman",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        isDeleted: false,
        deletedAt: null,
        isAssessmentBanned: false,
      },
      create: {
        name: "Ayesha Rahman",
        email: "candidate.cred@talentgraph.test",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
      },
    });

    const credProfile = await prisma.candidateProfile.upsert({
      where: { userId: credCandidate.id },
      update: {
        name: credCandidate.name,
        headline: "Full-Stack TypeScript & PostgreSQL Engineer",
        githubSyncCount: 1,
        links: {
          github: "https://github.com/octocat",
          linkedin: "https://linkedin.com/in/ayesha-rahman-demo",
          website: "https://ayesha.dev",
        },
        education: [
          {
            institution: "North South University",
            degree: "B.Sc. in Computer Science & Engineering",
            startDate: "2022",
            endDate: "2026",
          },
        ],
      },
      create: {
        userId: credCandidate.id,
        name: credCandidate.name,
        headline: "Full-Stack TypeScript & PostgreSQL Engineer",
        githubSyncCount: 1,
        links: {
          github: "https://github.com/octocat",
          linkedin: "https://linkedin.com/in/ayesha-rahman-demo",
          website: "https://ayesha.dev",
        },
        education: [
          {
            institution: "North South University",
            degree: "B.Sc. in Computer Science & Engineering",
            startDate: "2022",
            endDate: "2026",
          },
        ],
      },
    });

    // Seed sample GitHubRepos for credProfile if none exist
    const existingRepos = await prisma.gitHubRepo.count({
      where: { candidateId: credProfile.id },
    });
    if (existingRepos === 0) {
      await prisma.gitHubRepo.createMany({
        data: [
          {
            candidateId: credProfile.id,
            repoName: "talentgraph-api-starter",
            repoUrl: "https://github.com/octocat/talentgraph-api-starter",
            isSelected: true,
            lastSyncCommitSha: "a1b2c3d4e5f6",
            languages: { TypeScript: 78, SQL: 22 },
            dependencies: { express: "5.2.1", prisma: "7.10.1" },
            stargazers: 42,
            lastCommitAt: new Date(),
          },
          {
            candidateId: credProfile.id,
            repoName: "nextjs-skillgraph-ui",
            repoUrl: "https://github.com/octocat/nextjs-skillgraph-ui",
            isSelected: true,
            lastSyncCommitSha: "f6e5d4c3b2a1",
            languages: { TypeScript: 84, CSS: 16 },
            dependencies: { next: "16.4.2", react: "19.3.0" },
            stargazers: 19,
            lastCommitAt: new Date(),
          },
        ],
      });
    }

    // Seed CandidateSkills & Evidence from seeded Skill taxonomy
    const targetSkills = await prisma.skill.findMany({
      where: { name: { in: ["TypeScript", "Node.js", "PostgreSQL", "React"] } },
    });
    for (const skill of targetSkills) {
      const candidateSkill = await prisma.candidateSkill.upsert({
        where: {
          candidateId_skillId: {
            candidateId: credProfile.id,
            skillId: skill.id,
          },
        },
        update: { overallScore: 88 },
        create: {
          candidateId: credProfile.id,
          skillId: skill.id,
          overallScore: 88,
        },
      });

      const evidenceCount = await prisma.evidence.count({
        where: { candidateSkillId: candidateSkill.id },
      });
      if (evidenceCount === 0) {
        await prisma.evidence.create({
          data: {
            candidateSkillId: candidateSkill.id,
            type: "GITHUB_REPO",
            sourceUrl: "https://github.com/octocat/talentgraph-api-starter",
            description: `Demonstrated ${skill.name} usage in production API modules.`,
            extractedScore: 88,
            metadata: { repo: "talentgraph-api-starter", commit: "a1b2c3d4" },
          },
        });
      }
    }

    // 3. GitHub OAuth Candidate (no password; tests GitHub-only auth provider)
    const ghCandidate = await prisma.user.upsert({
      where: { email: "candidate.github@talentgraph.test" },
      update: {
        name: "Rafiq Islam",
        password: null,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "GITHUB",
        githubId: "demo-gh-candidate-101",
        emailVerified: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Rafiq Islam",
        email: "candidate.github@talentgraph.test",
        password: null,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "GITHUB",
        githubId: "demo-gh-candidate-101",
        emailVerified: true,
      },
    });

    await prisma.candidateProfile.upsert({
      where: { userId: ghCandidate.id },
      update: {
        name: ghCandidate.name,
        headline: "Backend Go & Docker Developer",
      },
      create: {
        userId: ghCandidate.id,
        name: ghCandidate.name,
        headline: "Backend Go & Docker Developer",
        links: { github: "https://github.com/torvalds" },
      },
    });

    // 4. Assessment-Banned Candidate (tests integrity restriction + admin ban override)
    const bannedCandidate = await prisma.user.upsert({
      where: { email: "candidate.banned@talentgraph.test" },
      update: {
        name: "Nabil Karim",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        githubId: "demo-gh-banned-102",
        emailVerified: true,
        isAssessmentBanned: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Nabil Karim",
        email: "candidate.banned@talentgraph.test",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        githubId: "demo-gh-banned-102",
        emailVerified: true,
        isAssessmentBanned: true,
      },
    });

    await prisma.candidateProfile.upsert({
      where: { userId: bannedCandidate.id },
      update: { name: bannedCandidate.name },
      create: {
        userId: bannedCandidate.id,
        name: bannedCandidate.name,
        headline: "Junior Frontend Engineer",
      },
    });

    // 5. Credential Recruiter linked to VERIFIED Company
    const credRecruiter = await prisma.user.upsert({
      where: { email: "recruiter@talentgraph.test" },
      update: {
        name: "Farhana Chowdhury",
        password: hashedPassword,
        role: "RECRUITER",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Farhana Chowdhury",
        email: "recruiter@talentgraph.test",
        password: hashedPassword,
        role: "RECRUITER",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
      },
    });

    await prisma.recruiterProfile.upsert({
      where: { userId: credRecruiter.id },
      update: {
        name: credRecruiter.name,
        companyId: verifiedCompany.id,
      },
      create: {
        userId: credRecruiter.id,
        name: credRecruiter.name,
        companyId: verifiedCompany.id,
      },
    });

    // 6. GitHub OAuth Recruiter linked to PENDING Company
    const ghRecruiter = await prisma.user.upsert({
      where: { email: "recruiter.github@talentgraph.test" },
      update: {
        name: "Sajid Hasan",
        password: null,
        role: "RECRUITER",
        status: "ACTIVE",
        authProvider: "GITHUB",
        githubId: "demo-gh-recruiter-201",
        emailVerified: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Sajid Hasan",
        email: "recruiter.github@talentgraph.test",
        password: null,
        role: "RECRUITER",
        status: "ACTIVE",
        authProvider: "GITHUB",
        githubId: "demo-gh-recruiter-201",
        emailVerified: true,
      },
    });

    await prisma.recruiterProfile.upsert({
      where: { userId: ghRecruiter.id },
      update: {
        name: ghRecruiter.name,
        companyId: pendingCompany.id,
      },
      create: {
        userId: ghRecruiter.id,
        name: ghRecruiter.name,
        companyId: pendingCompany.id,
      },
    });

    // 7. Sub-Recruiter (needPasswordChange: true, linked to VERIFIED Company)
    const subRecruiter = await prisma.user.upsert({
      where: { email: "subrecruiter@talentgraph.test" },
      update: {
        name: "Tania Sultana",
        password: hashedPassword,
        role: "SUB_RECRUITER",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        needPasswordChange: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Tania Sultana",
        email: "subrecruiter@talentgraph.test",
        password: hashedPassword,
        role: "SUB_RECRUITER",
        status: "ACTIVE",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        needPasswordChange: true,
      },
    });

    await prisma.recruiterProfile.upsert({
      where: { userId: subRecruiter.id },
      update: {
        name: subRecruiter.name,
        companyId: verifiedCompany.id,
      },
      create: {
        userId: subRecruiter.id,
        name: subRecruiter.name,
        companyId: verifiedCompany.id,
      },
    });

    // 8. BLOCKED User (tests 403 blocked login rejection & Admin unblock)
    await prisma.user.upsert({
      where: { email: "blocked.user@talentgraph.test" },
      update: {
        name: "Blocked Demo User",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "BLOCKED",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        isDeleted: false,
        deletedAt: null,
      },
      create: {
        name: "Blocked Demo User",
        email: "blocked.user@talentgraph.test",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "BLOCKED",
        authProvider: "CREDENTIAL",
        emailVerified: true,
      },
    });

    // 9. DELETED User (tests 403 deleted login rejection & Admin restore)
    await prisma.user.upsert({
      where: { email: "deleted.user@talentgraph.test" },
      update: {
        name: "Deleted Demo User",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "DELETED",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        isDeleted: true,
        deletedAt: new Date(),
      },
      create: {
        name: "Deleted Demo User",
        email: "deleted.user@talentgraph.test",
        password: hashedPassword,
        role: "CANDIDATE",
        status: "DELETED",
        authProvider: "CREDENTIAL",
        emailVerified: true,
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    console.log("Demo seed completed successfully.");
    console.log({
      passwordForCredentialAccounts: DEMO_PASSWORD,
      systemAdminEmail: config.system_admin_email,
      companies: [verifiedCompany.name, pendingCompany.name],
    });
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((err) => {
  console.error("Demo seed failed:", err);
  process.exit(1);
});
