import { Order, User, Meal } from '../models';

class OrdersController {
  static createOrder(req, res, next) {
    const { amount, mealId } = req.body;
    const { id } = req.user;
    const customerId = id;
    const date = new Date();

    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        User.findById(id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'User does not exist' });
            }
            Order.create({
              date,
              amount,
              customerId,
              mealid: mealId,
            })
              .then(() => res.status(200)
                .send({ message: 'New order successfully created' }))
              .catch(error => next(error));
          })
          .catch(error => next(error));
      });
  }

  static listOrders(req, res, next) {
    Order.findAll({
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'price', 'imageurl'],
      }, {
        model: User,
        attributes: ['id', 'username'],
      }],
    })
      .then(orders => res.status(200).send({ orders }))
      .catch(error => next(error));
  }

  static updateOrder(req, res, next) {
    const originalMealId = req.params.id;
    const { cancel, newMealId, amount } = req.body;
    const date = new Date();
    const { id } = req.user;

    if (cancel) {
      return Order.destroy({
        where: { customerId: id, mealid: originalMealId },
      })
        .then(() => res.status(200).send({
          message: 'Your order has been cancelled',
        }))
        .catch(error => next(error));
    }

    return Order.findById(originalMealId)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }
        order.update({
          customerId: id,
          mealid: newMealId,
          date,
          amount,
        })
          .then(() => res.status(200).send({
            message: 'Your order has been updated',
          }))
          .catch(error => next(error));
      });
  }
}
export default OrdersController;

