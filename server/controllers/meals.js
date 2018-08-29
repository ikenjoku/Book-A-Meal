import { Meal } from '../models';

/**
 * @description - It contains utility methods for meals
 *
 * @class MealController
 */
class MealController {
  /**
   * @description - Add a new meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MealController
   */
  static addMeal(req, res, next) {
    const { name, description } = req.body;
    const imageurl = req.file.secure_url;
    let { price } = req.body;
    price = Number(price);
    Meal.findOne({ where: { name } })
      .then((meal) => {
        if (meal) {
          return res.status(409).send({
            message: 'Meal already exist',
          });
        }
        Meal.create({
          name,
          description,
          price,
          imageurl,
        })
          .then(newMeal => res.status(201).send({
            message: 'Successfully added a new meal',
            meal: newMeal,
          }))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
  /**
   * @description - Get a particular meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MealController
   */
  static getMeal(req, res, next) {
    const mealId = Number(req.params.id);
    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal cannot be found',
          });
        }
        res.status(200).send({
          meal,
        });
      })
      .catch(error => next(error));
  }
  /**
   * @description - Get oaginated meals
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MealController
   */

  static getMeals(req, res, next) {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);

    Meal.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    }).then((meals) => {
      if (meals.count === 0) {
        return res.status(404).send({
          message: 'No meals found',
          meals: meals.rows,
        });
      }
      const pages = Math.ceil(meals.count / limit);
      return res.status(200).send({
        message: 'Meals successfully retrieved',
        meals,
        pages,
        count: meals.count,
      });
    })
      .catch(error => next(error));
  }

  /**
   * @description - Edits a particular meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MealController
   */
  static updateMeal(req, res, next) {
    const id = Number(req.params.id);
    delete req.body.id;
    const body = req.body;

    if (req.file.secure_url) {
      body.imageurl = req.file.secure_url;
    }

    Meal.findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(422).send({
            message: 'Meal does not exist',
          });
        }
        meal.update(body)
          .then((updatedMeal) => {
            res.status(200).send({
              message: 'Successfully updated meal',
              updatedMeal,
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
  /**
   * @description - Remove a particular meal
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof MealController
   */
  static removeMeal(req, res, next) {
    const mealId = Number(req.params.id);
    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal cannot be found',
          });
        }
        Meal.destroy({ where: { id: mealId } })
          .then(() => res.status(200).send({
            message: 'Successfully deleted meal',
          }))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}


export default MealController;
