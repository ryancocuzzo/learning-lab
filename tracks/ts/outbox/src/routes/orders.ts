import express from "express";
import { CreateOrderController } from "../controllers/CreateOrderController";
import { Request, Response } from "express";

export class OrdersRouter {
  private router: express.Router;

  constructor(createOrderController: CreateOrderController) {
    this.router = express.Router();
    this.router.post("/", (req: Request, res: Response) =>
      createOrderController.createOrder(req, res),
    );
  }

  getRouter(): express.Router {
    return this.router;
  }
}
