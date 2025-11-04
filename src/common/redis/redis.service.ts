import { Injectable } from "@nestjs/common";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  // 读取缓存
  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    console.log(data, "返回实际数据");
    if (!data) return null;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length === 0 ? null : parsed;
    } catch {
      return data as any;
    }
  }

  // 设置缓存（带过期时间）
  async set(key: string, value: any, ttlSeconds = 5 * 60): Promise<void> {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    await this.redis.setex(key, ttlSeconds, data);
  }

  // 可选：删除缓存
  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
