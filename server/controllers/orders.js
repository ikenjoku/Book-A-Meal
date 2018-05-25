import { Order, User, Meal } from '../models';

class OrdersController {
  static createOrder(req, res, next) {
    const { mealId } = req.body;
    const { id } = req.user;
    const userId = id;
    const date = new Date().toISOString().substr(0, 10);

    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        User.findById(id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'Please signup to proceed' });
            }
            Order.create({
              date,
              amount: meal.price,
              userId,
              mealId,
            })
              .then(order => res.status(201)
                .send({
                  message: `${meal.name} has been ordered.`,
                  order,
                }))
              .catch(error => next(error));
          })
          .catch(error => next(error));
      });
  }
  static getAllOrders(req, res, next) {
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
        res.status(200).send({
          message: 'All orders retrieved successfully',
          orders,
        });
      })
      .catch(err => res.status(400).send({
        message: 'Error occured while finding order',
        err,
      }));
  }

  static getOrdersByDate(req, res) {
    const todaysdate = new Date().toISOString();
    const date = req.query.date || todaysdate.substr(0, 10);

    Order.findAll({
      where: { date },
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
            message: 'No orders found for this day',
          });
        }
        res.status(200).send({
          message: `Orders for ${date} retrieved successfully`,
          orders,
        });
      })
      .catch(err => res.status(400).send({
        message: 'Error occured while finding order',
        err,
      }));
  }

  static getOrdersByUser(req, res, next) {
    const userId = req.user.id;

    Order.findAll({
      where: { userId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price'],
        },
      ],
    })
      .then((orders) => {
        if (orders.length === 0) {
          return res.status(404).send({
            message: 'You have not made any orders yet',
          });
        }
        res.status(200).send({
          message: 'Your prevoius orders',
          orders,
        });
      })
      .catch(error => res.status(400).send({
        message: 'Error occured while finding your previous orders',
        error,
      }));
  }

  static deliverOrder(req, res, next) {
    const { id } = req.params;
    Order.findById(id)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }
        order.update({
          status: 'delivered',
        })
          .then(() => res.status(200).send({
            message: 'Order has been delivered',
            order,
          }))
          .catch(error => next(error));
      });
  }

  static updateOrder(req, res, next) {
    const originalOrderId = req.params.id;
    const { cancel } = req.body;
    const id = Number(req.user.id);
    const newMealId = Number(req.body.newMealId);

    Order.findById(originalOrderId)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order was not found' });
        }
        if (order.userId !== id) {
          return res.status(401).send({ message: 'You can not modify this order' });
        }
        const orderHour = new Date(order.createdAt).getHours() * 60;
        const orderMinutes = new Date(order.createdAt).getMinutes();
        const orderTime = orderHour + orderMinutes;
        const timeNow = (new Date().getHours() * 60) + (new Date().getMinutes());

        if ((timeNow - orderTime) > 15) {
          return res.status(401).send({ message: 'You can not modify this order anymore' });
        }
        if (cancel) {
          return order.update({
            status: 'cancelled',
          })
            .then(() => res.status(200).send({
              message: 'Your order has been cancelled',
              order,
            }))
            .catch(error => next(error));
        }

        Meal.findById(newMealId)
          .then((newMeal) => {
            if (!newMeal) {
              return res.status(400).send({
                message: 'New Meal does not exist',
              });
            }
            order.update({
              mealId: newMeal.id,
              amount: newMeal.price,
            })
              .then(updatedOrder => res.status(200).send({
                message: 'Your order has been updated',
                order: updatedOrder,
              }))
              .catch(error => next(error));
          })
          .catch(error => next(error));
      });
  }
}
export default OrdersController;

