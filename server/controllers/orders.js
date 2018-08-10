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
   * Retrieve orders from database
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
  static getOrders(req, res, next) {
    const query = {};
    if (req.query.date) query.date = req.query.date;
    if (req.query.userId) query.userId = req.query.userId;

    Order.findAll({
      where: query,
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
          message: 'Orders retrieved successfully',
          orders,
        });
      })
      .catch(error => next(error));
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
    Order.findById(originalOrderId)
      .then((order) => {
        if (!order) {
          return res.status(400).send({
            message: 'Order does not exist',
          });
        }

        order.update(req.body)
          .then(updatedOrder => res.status(200).send({
            message: 'Your order has been updated',
            order: updatedOrder,
          }))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}

export default OrderController;

