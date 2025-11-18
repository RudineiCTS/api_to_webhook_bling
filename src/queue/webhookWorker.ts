import { Worker } from "bullmq";
import { redisConfig } from "../config/redis";
import { WebhookService } from "../services/webhookService";

export const webhookWorker = new Worker(
  "webhook-queue",
  async (job) => {
    console.log("👷 Worker recebeu job:", job.id);

    await WebhookService.processWebhook(job.data);

    return { status: "done" };
  },
  { connection: redisConfig }
);

webhookWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} finalizado`);
});

webhookWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} falhou:`, err);
});
