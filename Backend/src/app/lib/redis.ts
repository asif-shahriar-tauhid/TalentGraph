import { createClient } from "redis";
import config from "../config";

export const redisClient = createClient({
  username: config.redis_user || undefined,
  password: config.redis_password || undefined,
  socket: {
    host: config.redis_host,
    port: Number(config.redis_port),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
