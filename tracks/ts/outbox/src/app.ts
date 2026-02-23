import express from "express";
import { AppConfig } from "./config";
import { OrdersRouter } from "./routes/orders";
import { DbClient } from "./db/dbClient";
export class App {
  private app: express.Application;
  private isRunning: boolean = false;

  constructor(
    private readonly appConfig: AppConfig,
    ordersRouter: OrdersRouter,
  ) {
    this.app = express();
    this.app.use(express.json());
    this.app.use("/orders", ordersRouter.getRouter());
  }

  run(): void {
    if (this.isRunning) {
      throw new Error("Server is already running.");
    }
    this.isRunning = true;
    this.app.listen(this.appConfig.PORT, () =>
      console.log(`Listening to port ${this.appConfig.PORT}`),
    );
  }
}
