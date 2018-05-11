import { Menu, Meal, MealMenu } from '../models';

class MenuController {
  static getMenu(req, res) {
    let { date = new Date().toISOString() } = req.body;
    date = date.substr(0, 10);
    Menu.findOne({
      where: { date },
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'price', 'imageurl'],
      }],
    }).then((menu) => {
      res.send(menu);
    }).catch((error) => {
      res.status(400).send({
        message: 'Menu could not be found',
        error,
      });
    });
  }

  static createMenu(req, res, next) {
    const { mealId } = req.body;
    const date = new Date();

    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        Menu.findOne({ where: { date } })
          .then((menu) => {
            if (menu) {
              menu.addMeal(mealId)
                .then((menus) => {
                  res.status(200).send({
                    message: 'Your menu has been updated',
                    menus,
                  });
                })
                .catch(error => next(error));
            } else {
              Menu.create({ date })
                .then((newMenu) => {
                  newMenu.addMeal(mealId)
                    .then((menus) => {
                      const mealMenuInstance = new MealMenu({
                        mealid: mealId,
                        menuid: newMenu.id,
                      });
                      mealMenuInstance.save();
                      res.status(200).send({
                        message: 'Menu created successfully',
                        menus,
                      });
                    })
                    .catch(error => next(error));
                }).catch((error) => {
                  res.status(400).send({
                    message: 'Menu could not be created',
                    error,
                  });
                });
            }
          }).catch((error) => {
            res.status(400).send({
              message: 'Menu couln not be found',
              error,
            });
          });
        
      });

  }
}


export default MenuController;
