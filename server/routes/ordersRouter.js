import express from 'express';
import orderController from '../controllers/orders';

const ordersRouter = express.Router();

ordersRouter.get('/', orderController.listOrders);
ordersRouter.post('/', orderController.createOrder);

ordersRouter.put('/:orderId', orderController.updateOrder);

export default ordersRouter;
