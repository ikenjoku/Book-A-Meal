import { Meal } from '../models';

class MealsController {
  static addMeal(req, res, next) {
    const { name, description, imageurl } = req.body;
    let { price } = req.body;
    price = Number(price);
    if (!name || !description || !price || !imageurl) {
      res.status(400).send({
        message: 'Please fill in the missing fields',
      });
    }
    Meal.create({
      name,
      description,
      price,
      imageurl,
    })
      .then(meal => res.status(201).send({
        meal,
        message: 'Successfully added a new meal',
      }))
      .catch(error => next(error));
  }

  static getMeals(req, res, next) {
    Meal.findAll()
      .then(meals => res.status(200).send({ meals }))
      .catch(error => next(error));
  }

  static updateMeal(req, res, next) {
    const { id } = req.params;
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
              updatedMeal,
              message: 'Successfully updated meal',
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }

  static removeMeal(req, res, next) {
    const { id } = req.params;
    Meal.destroy({ where: { id } })
      .then(() => res.status(200).send({
        message: 'Successfully deleted meal',
      }))
      .catch(error => next(error));
  }
}


export default MealsController;
