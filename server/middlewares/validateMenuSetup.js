import { Meal } from '../models';

export const validateMenuSetup = (req, res, next) => {
  const mealIds = [...new Set(req.body.mealIds)];
  for (let i = 0; i < mealIds.length; i = 1 + i) {
    const mealId = Number(mealIds[i]);
    if (!Number.isInteger(mealId) || mealId < 1) {
      return res.status(400).send({
        message: 'Invalid meal IDs',
      });
    }
    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(400).send({
            message: 'Meal does not exist. Check meal_id sent',
          });
        }
      })
      .catch(error => next(error));
  }
  next();
};
