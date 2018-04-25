import IndexController from './index';
import Order from '../model-mocks/orders';

class OrdersController extends IndexController {
  static createOrder(req, res) {
    const {
      customerId,
      date,
      amount,
      meals,
    } = req.body;
    if (!customerId || !date || !amount || !meals) {
      res.status(400).send({
        message: 'Ooops ! Somehting is not right.',
      });
    }
    Order.push({
      id: Order[Order.length - 1] + 1,
      customerId,
      date,
      meals,
    });
    const newOrderIndex = Order.findIndex(order => order.customerId === req.body.customerId);
    return res.status(201).send(Order[newOrderIndex]);
  }

  static listOrders(req, res) {
    return res.status(200).send(Order);
  }

  static updateOrder(req, res) {
    const orderIndex = Order.findIndex(order => order.id === req.params.orderId);
    if (orderIndex === -1) {
      return res.status(404).send({
        message: 'Order Not Found',
      });
    }
    const updatedOrder = { ...Order[orderIndex], ...req.body };
    Order.splice(orderIndex, 1, updatedOrder);
    return res.status(200).send(updatedOrder);
  }
}

export default OrdersController;

