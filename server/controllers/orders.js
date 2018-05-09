import { Order, User, Meal, Menu } from '../models';

class OrdersController {
  static createOrder(req, res) {
    const {
      customerId,
      date,
      amount,
      meals,
    } = req.body;

    if (!customerId || !date || !amount || !meals) {
      res.status(400).send({
        message: 'Ooops! Something is not right.',
      });
    }
    Order.push({
      id: Order[Order.length - 1].id + 1,
      customerId,
      date,
      meals,
    });
    const newOrderIndex = Order.findIndex(order => order.customerId === req.body.customerId);
    return res.status(201).send({ order: Order[newOrderIndex] });
  }

  static listOrders(req, res) {
    if (req.params.date) {
      const orderForDate = Order.filter(order => order.date === req.params.date);
      return res.status(200).send({ order: orderForDate });
    }
    return res.status(200).send({ orders: Order });
  }

  static updateOrder(req, res) {
    const orderIndex = Order.findIndex(order => order.id === Number(req.params.orderId));
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

