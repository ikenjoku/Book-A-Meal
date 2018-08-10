import moment from 'moment';
import { Menu, Meal, MealMenu } from '../models';

/**
 * It contains utility methodes for menu
 *
 * @class MenuController
 */
class MenuController {
  /**
   * Get menu for a particular day
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MenuController
   */
  static getMenu(req, res, next) {
    const todaysdate = new Date().toISOString();
    const date = req.query.date || todaysdate.substr(0, 10);
    Menu.findOne({
      where: { date },
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'price', 'description', 'imageurl'],
      }],
    }).then((menu) => {
      if (!menu) {
        return res.status(404).send({ message: `Menu has not been set for ${moment(date).format('dddd, MMMM Do YYYY')}` });
      }
      res.status(200).send({ menu });
    }).catch(error => next(error));
  }
  /**
   * Create menu for a particular day
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MenuController
   */
  static createMenu(req, res, next) {
    const { date, mealId } = req.body;

    if (date && !mealId) {
      return Menu.findOne({ where: { date } })
        .then((menu) => {
          if (!menu) {
            return Menu.create({ date })
              .then(newMenu => res.status(201).send({
                message: `Successfully created a menu for ${moment(date).format('dddd, MMMM Do YYYY')}`,
                newMenu,
              }))
              .catch(error => next(error));
          }
          res.status(400).send({
            message: `Menu for ${moment(date).format('dddd, MMMM Do YYYY')} already exists`,
          });
        })
        .catch(error => next(error));
    }
    Menu.findOne({ where: { date } })
      .then((menu) => {
        if (!menu) {
          return res.status(400).send({
            message: `No menu is set for ${moment(date).format('dddd, MMMM Do YYYY')}`,
          });
        }
        menu.addMeal(mealId)
          .then((updatedMenu) => {
            const mealMenuInstance = new MealMenu({
              mealId,
              menuId: menu.id,
            });
            mealMenuInstance.save();
            res.status(200).send({
              message: `Meal added to menu of ${moment(date).format('dddd, MMMM Do YYYY')}`,
              updatedMenu,
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}

export default MenuController;
