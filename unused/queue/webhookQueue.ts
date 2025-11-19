import { Queue } from "bullmq";
import { redisConfig } from "../../src/config/redis";

export const webhookQueue = new Queue("webhook-queue", {
  connection: redisConfig
});
