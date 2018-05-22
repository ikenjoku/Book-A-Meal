import { Menu, Meal, MealMenu } from '../models';

class MenuController {
  static getMenu(req, res) {
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
        return res.status(404).send({ message: `Menu has not been set for ${date}` });
      }
      res.send(menu);
    }).catch((error) => {
      res.status(400).send({
        message: 'Menu could not be found',
        error,
      });
    });
  }

  static createMenu(req, res, next) {
    const { date, mealId } = req.body;

    if (date && !mealId) {
      return Menu.findOne({ where: { date } })
        .then((menu) => {
          if (!menu) {
            return Menu.create({ date })
              .then(newMenu => res.status(201).send({
                message: `Menu for ${date} was successfully created`,
                newMenu,
              }))
              .catch(error => next(error));
          }
          res.status(400).send({
            message: `Menu for ${date} already exist`,
          });
        });
    }
    Menu.findOne({ where: { date } })
      .then((menu) => {
        if (!menu) {
          return res.status(400).send({
            message: `No menu is set for ${date}`,
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
              message: `Meal added to menu of ${date} successfully`,
              updatedMenu,
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }
}

export default MenuController;
