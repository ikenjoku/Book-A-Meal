import path from 'path';
import fs from 'fs';
const menu = path.join(__dirname, '/data/menus.json');


function readJsonFile(file) {
    return fs.readFileSync(file);
}

const Menu = JSON.parse(readJsonFile(menu));


module.exports = {
    create(req, res) {
        Menu.push(req.body)
        const newMenuIndex = Menu.findIndex(menu => menu.name == req.body.name);
        return res.status(201).send(Menu[newMenuIndex]);
    },
    list(req, res) {
        return res.status(200).send(Menu);
    }
};