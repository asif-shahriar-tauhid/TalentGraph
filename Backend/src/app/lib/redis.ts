import { createClient } from "redis";
import config from "../config";

const normalizeRedisUrl = (rawUrl?: string): string | undefined => {
  if (!rawUrl) return undefined;
  let cleaned = rawUrl.trim();
  const hasTlsFlag = cleaned.includes("--tls");

  const match = cleaned.match(/rediss?:\/\/[^\s"']+/);
  if (match) {
    cleaned = match[0];
  }

  if (
    (hasTlsFlag || cleaned.includes(".upstash.io")) &&
    cleaned.startsWith("redis://")
  ) {
    cleaned = cleaned.replace(/^redis:\/\//, "rediss://");
  }

  return cleaned;
};

const resolvedRedisUrl = normalizeRedisUrl(config.redis_url);

export const redisClient = resolvedRedisUrl
  ? createClient({
      url: resolvedRedisUrl,
    })
  : createClient({
      username: config.redis_user || undefined,
      password: config.redis_password || undefined,
      socket: {
        host: config.redis_host,
        port: Number(config.redis_port),
      },
    });

redisClient.on("error", (err) => console.error("Redis Client Error", err));
