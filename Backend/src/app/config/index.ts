import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL!,
  frontend_url: process.env.FRONTEND_URL || "http://localhost:3000",
  backend_url: process.env.BACKEND_URL || "http://localhost:5000",
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  system_admin_name: process.env.SYSTEM_ADMIN_NAME || "System Admin",
  system_admin_email: process.env.SYSTEM_ADMIN_EMAIL || "admin@talentgraph.com",
  system_admin_password: process.env.SYSTEM_ADMIN_PASSWORD || "AdminPassword@123",
  redis_user: process.env.REDIS_USER,
  redis_password: process.env.REDIS_PASSWORD,
  redis_host: process.env.REDIS_HOST || "localhost",
  redis_port: Number(process.env.REDIS_PORT) || 6379,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  email_sender: process.env.EMAIL_SENDER || "TalentGraph <no-reply@talentgraph.com>",
  github_client_id: process.env.GITHUB_CLIENT_ID || "",
  github_client_secret: process.env.GITHUB_CLIENT_SECRET || "",
  github_callback_url: process.env.GITHUB_CALLBACK_URL || "",
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  service_api_key: process.env.SERVICE_API_KEY || "talentgraph_service_secret_key",
};
