import { Menu, Meal } from '../models';

class MenuController {
  static getMenu(req, res) {
    const { date } = req.body;

    Menu.findAll({
      include: [{
        model: Meal,
        attributes: ['name', 'price', 'imageurl'],
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

  static postMenu(req, res) {
    const { mealId } = req.body;
    const date = new Date();

    Menu.findOne({ where: { date } })
      .then((menu) => {
        if (menu) {
          menu.addMeals(mealId)
            .then((menus) => {
              res.status(200).send({
                message: 'New meal added to menu existing menu',
                menus,
              });
            }).catch(error => error);
        } else {
          Menu.create({ date })
            .then((newMenu) => {
              newMenu.addMeals(mealId)
                .then((menus) => {
                  res.status(200).send({
                    message: 'Menu created and a meal added',
                    menus,
                  });
                }).catch(error => error);
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
  }
}


export default MenuController;
