import * as z from "zod";
import "dotenv/config";

export const AppConfigSchema = z.object({
  PORT: z.string().default("8080"),
  DATABASE_URL: z.string(),
  KAFKA_BASE_URL: z.string(),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export const loadAppConfig = (): AppConfig => {
  const result = AppConfigSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Invalid configuration: ${result.error.message}`);
  }
  return result.data;
};
