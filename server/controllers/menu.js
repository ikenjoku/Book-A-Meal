import Menu from '../model-mocks/menus';

class MenuController {
  static createMenu(req, res) {
    const {
      name,
      date,
      meals,
    } = req.body;
    if (!name || !date || !meals) {
      res.status(400).send({
        message: 'Missing Menu Information',
      });
    }
    Menu.push({
      id: Menu[Menu.length - 1].id + 1,
      name,
      date,
      meals,
    });
    const newMenuIndex = Menu.findIndex(menu => menu.name === req.body.name);
    return res.status(201).send({ menu: Menu[newMenuIndex] });
  }

  static listMenu(req, res) {
    return res.status(200).send({ menus: Menu });
  }
}

export default MenuController;
