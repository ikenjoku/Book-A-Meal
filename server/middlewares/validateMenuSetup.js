

export const validateMenuSetup = (req, res, next) => {
  const { mealIds } = req.body;

  for (let i = 0; i < mealIds.length; i = 1 + i) {
    const mealId = mealIds[i];
    if (Number.isInteger(Number(mealId)) && !Number.isNaN(mealId) && mealId < 1) {
      res.status(400).send({
        message: 'Invalid meal IDs',
      });
    }
  }
  next();
};
