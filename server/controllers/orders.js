import { Order, User, Meal } from '../models';

class OrdersController {
  static createOrder(req, res, next) {
    const { amount, mealId } = req.body;
    const { id } = req.user;
    const userId = id;
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
              userId,
              mealId,
            })
              .then(() => res.status(200)
                .send({ message: 'New order successfully created' }))
              .catch(error => next(error));
          })
          .catch(error => next(error));
      });
  }


  static listOrders(req, res) {
    if (req.query.date) {
      Order.findAll({
        include: [{
          model: User,
          attributes: ['id', 'firstname', 'lastname'],
        }, {
          model: Meal,
          attributes: ['id', 'name', 'price'],
        }],
        where: {
          date: req.query.date,
        },
      })
        .then((orders) => {
          if (orders.length < 1) {
            return res.status(404).send({
              message: 'No orders found for this day',
            });
          }
          return res.status(200).send({
            message: 'Orders retrieved successfully',
            orders,
          });
        })
        .catch(err => res.status(400).send({
          message: 'Error occured while finding order',
          err,
        }));
    }

    Order.findAll({
      include: [{
        model: User,
        attributes: ['id', 'firstname', 'lastname'],
      }, {
        model: Meal,
        attributes: ['id', 'name', 'price'],
      }],
    })
      .then((orders) => {
        if (orders.length < 1) {
          return res.status(404).send({
            message: 'No orders found',
          });
        }
        return res.status(200).send({
          message: 'Orders retrieved successfully',
          orders,
        });
      })
      .catch(err => res.status(400).send({
        message: 'Error occured while finding order',
        err,
      }));
  }


  static updateOrder(req, res, next) {
    const originalOrderId = req.params.id;
    const { cancel, newMealId, amount } = req.body;
    const date = new Date();
    const { id } = req.user;

    if (cancel) {
      Order.destroy({
        where: { id: originalOrderId },
      })
        .then(() => res.status(200).send({
          message: 'Your order has been cancelled',
        }))
        .catch(error => next(error));
    }

    return Order.findById(originalOrderId)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }
        order.update({
          userId: id,
          mealId: newMealId,
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

