import { Order, User, Meal } from '../models';

class OrdersController {
  static createOrder(req, res, next) {
    const { amount, userId, mealId } = req.body;
    console.log('===\n', req.body, '\n======');
    const date = new Date();

    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        User.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'User does not exist' });
            }
            Order.create({
              date,
              amount,
              userId,
              mealId,
            })
              .then(order => res.status(200)
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
      .then(order => res.status(200).send({ orders }))
      .catch(error => next(error));
  }

  static updateOrder(req, res, next) {
    const { id } = require.params;
    const { cancel, mealId } = req.body;

    Order.findById(id)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }

      });
  }

}
export default OrdersController;

