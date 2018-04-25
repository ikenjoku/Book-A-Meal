import express from 'express';
import orderController from '../controllers/orders';

const ordersRouter = express.Router();

ordersRouter.get('/', orderController.listOrders);
ordersRouter.post('/', orderController.createOrder);

ordersRouter.put('/api/v1/orders/:orderId', orderController.updateOrder);
