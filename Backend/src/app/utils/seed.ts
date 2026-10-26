import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";

export const seedSuperAdmin = async () => {
  try {
    const existing = await prisma.user.findFirst({
      where: { role: "SYSTEM_ADMIN" },
    });

    if (existing) {
      return;
    }

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
  } catch (error) {
    console.error("Error seeding System Admin:", error);
  }
};
