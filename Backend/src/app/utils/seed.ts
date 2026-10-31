import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";

const DEFAULT_SKILLS = [
  { name: "React", aliases: ["ReactJS", "React.js", "React 18", "React 19"], category: "Frontend" },
  { name: "Next.js", aliases: ["NextJS", "Next"], category: "Frontend" },
  { name: "TypeScript", aliases: ["TS"], category: "Language" },
  { name: "JavaScript", aliases: ["JS", "ECMAScript", "ES6"], category: "Language" },
  { name: "Node.js", aliases: ["NodeJS", "Node"], category: "Backend" },
  { name: "Express", aliases: ["Express.js", "ExpressJS"], category: "Backend" },
  { name: "PostgreSQL", aliases: ["Postgres", "pg", "pgvector"], category: "Database" },
  { name: "Prisma", aliases: ["Prisma ORM"], category: "Database" },
  { name: "Redis", aliases: ["Redis Cache"], category: "Database" },
  { name: "Flutter", aliases: ["Flutter SDK"], category: "Mobile" },
  { name: "Dart", aliases: ["Dart Lang"], category: "Language" },
  { name: "Python", aliases: ["Python 3", "py"], category: "Language" },
  { name: "Docker", aliases: ["Containerization", "Dockerfile"], category: "DevOps" },
  { name: "Git", aliases: ["GitHub", "Version Control"], category: "Tooling" },
];

export const seedInitialSkills = async () => {
  try {
    for (const skill of DEFAULT_SKILLS) {
      await prisma.skill.upsert({
        where: { name: skill.name },
        update: {
          aliases: skill.aliases,
          category: skill.category,
        },
        create: skill,
      });
    }
  } catch (error) {
    console.error("Error seeding initial Skill taxonomy:", error);
  }
};

export const seedSuperAdmin = async () => {
  try {
    const existing = await prisma.user.findFirst({
      where: { role: "SYSTEM_ADMIN" },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(
        config.system_admin_password,
        config.bcrypt_salt_rounds,
      );

      await prisma.user.create({
        data: {
          name: config.system_admin_name,
          email: config.system_admin_email,
          password: hashedPassword,
          role: "SYSTEM_ADMIN",
          emailVerified: true,
        },
      });

      console.log("System Admin seeded successfully!");
    }

    await seedInitialSkills();
  } catch (error) {
    console.error("Error seeding System Admin:", error);
  }
};
