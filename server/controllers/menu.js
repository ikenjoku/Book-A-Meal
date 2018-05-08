import { Menu } from '../models';

class MenuController {
  static createMenu(req, res, next) {
    const {
      date,
    } = req.body;
    if (!date) {
      res.status(400).send({
        message: 'Missing Menu Information',
      });
    }
    Menu.create(req.body)
      .then(menu => res.status(201).send({
        menu,
        message: 'Successfully added a new menu',
      }))
      .catch(error => next(error));
  }

  static listMenu(req, res, next) {
    Menu.findAll({})
      .then(menu => res.status(200).send({ menus: menu }))
      .catch(error => next(error));
  }
}

export default MenuController;
