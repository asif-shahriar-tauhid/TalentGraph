import app from "./app";
import config from "./app/config";
import { transporter } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import { seedSuperAdmin } from "./app/utils/seed";

const PORT = config.port;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to Database successfully.");

    await redisClient.connect();
    console.log("Connected to Redis successfully.");

    try {
      await transporter.verify();
      console.log("Nodemailer SMTP verified successfully.");
    } catch (smtpErr) {
      console.warn("Nodemailer SMTP verification warning (check SMTP credentials in .env):", smtpErr);
    }

    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
