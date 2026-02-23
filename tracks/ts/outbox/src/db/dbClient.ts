import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { AppConfig } from "../config";

export class DbClient {
  private client: PrismaClient;

  constructor(appConfig: AppConfig) {
    const adapter = new PrismaPg({
      connectionString: appConfig.DATABASE_URL,
    });
    this.client = new PrismaClient({ adapter });
  }

  getClient(): PrismaClient {
    return this.client;
  }
}
