import { v4 as uuidv4 } from "uuid";
import { DbClient } from "../db/dbClient";
import { Order } from "../dto/Order";

export class CreateOrderUseCase {
  constructor(private readonly dbClient: DbClient) {}

  async invoke(order: Order): Promise<void> {
    const client = this.dbClient.getClient();
    const orderId = uuidv4().toString();
    await client.$transaction([
      client.order.create({
        data: {
          id: orderId,
          productId: order.productId,
          units: order.units,
          userId: order.userId,
        },
      }),
      client.outboxMessage.create({
        data: { topic: "orders.new", payload: order },
      }),
    ]);
  }
}
