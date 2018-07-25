import differenceInMinutes from 'date-fns/difference_in_minutes';

import { Order, User, Meal } from '../models';

/**
 * It contains utility methods for orders
 *
 * @class OrderController
 */
class OrderController {
  /**
   * Place an order for a particular meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
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
  /**
   * Get all orders from database
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
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
      .catch(error => next(error));
  }
  /**
   * Get orders for a particular day
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
  static getOrdersByDate(req, res, next) {
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
      .catch(error => next(error));
  }
  /**
   * Get orders for a particular user
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
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
      .catch(error => next(error));
  }
  /**
   * Deliver a particular order
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
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
  /**
   * Update a particlar order
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof OrderController
   */
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

        if ((differenceInMinutes(new Date(), new Date(order.createdAt))) >= 15) {
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
export default OrderController;

