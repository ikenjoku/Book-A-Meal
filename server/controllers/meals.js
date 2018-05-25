import { Meal } from '../models';

class MealController {
  static addMeal(req, res, next) {
    const { name, description, imageurl } = req.body;
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

  static getMeals(req, res, next) {
    Meal.findAll()
      .then(meals => res.status(200).send({ meals }))
      .catch(error => next(error));
  }

  static updateMeal(req, res, next) {
    const id = Number(req.params.id);
    delete req.body.id;
    Meal.findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(422).send({
            message: 'Meal does not exist',
          });
        }
        const {
          name,
          description,
          price,
          imageurl,
        } = req.body;
        meal.update({
          name, description, price, imageurl,
        })
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
