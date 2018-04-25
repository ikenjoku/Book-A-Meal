import IndexController from './index';
import Menu from '../model-mocks/menus';

class MenuController extends IndexController {
  static createMenu(req, res) {
    Menu.push(req.body);
    const newMenuIndex = Menu.findIndex(menu => menu.name === req.body.name);
    return res.status(201).send(Menu[newMenuIndex]);
  }

  static listMenu(req, res) {
    return res.status(200).send(Menu);
  }
}

export default MenuController;
