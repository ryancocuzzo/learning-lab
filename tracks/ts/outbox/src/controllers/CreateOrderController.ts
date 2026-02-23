import { Request, Response } from "express";
import * as z from "zod";
import { CreateOrderUseCase } from "../usecase/CreateOrderUseCase";
import { Order } from "../dto/Order";

const CreateOrderRequestSchema = z.object({
  productId: z.string(),
  units: z.number(),
  userId: z.string(),
});

type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export class CreateOrderController {
  constructor(private readonly usecase: CreateOrderUseCase) {}

  async createOrder(req: Request, res: Response) {
    const body = CreateOrderRequestSchema.safeParse(req.body);
    if (body.error) {
      res.status(400).send(body.error);
      return;
    }

    const order = this.mapRequestBodyToOrder(req.body);
    await this.usecase.invoke(order);
    res.status(201).json({ order });
  }

  mapRequestBodyToOrder(body: CreateOrderRequest): Order {
    return {
      userId: body.userId,
      productId: body.productId,
      units: body.units,
    };
  }
}
