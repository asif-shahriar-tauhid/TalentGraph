import { createClient } from "redis";
import config from "../config";

// Use REDIS_URL (e.g. Upstash rediss://) when set, otherwise fall back to host/port config.
export const redisClient = config.redis_url
  ? createClient({ url: config.redis_url })
  : createClient({
      username: config.redis_user || undefined,
      password: config.redis_password || undefined,
      socket: {
        host: config.redis_host,
        port: Number(config.redis_port),
      },
    });

redisClient.on("error", (err) => console.error("Redis Client Error", err));
