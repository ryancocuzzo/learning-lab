import { App } from "./app";
import { loadAppConfig } from "./config";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { DbClient } from "./db/dbClient";
import { OrdersRouter } from "./routes/orders";
import { CreateOrderUseCase } from "./usecase/CreateOrderUseCase";

const appConfig = loadAppConfig();
const dbClient = new DbClient(appConfig);
const createOrdersUseCase = new CreateOrderUseCase(dbClient);
const createOrdersController = new CreateOrderController(createOrdersUseCase);
const ordersRouter = new OrdersRouter(createOrdersController);
const app = new App(appConfig, ordersRouter);
app.run();
