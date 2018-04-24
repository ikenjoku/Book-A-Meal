// import { readJsonFile } from '../modules/meals';
import path from 'path';
import fs from 'fs';
const meal = path.join(__dirname, '/data/meals.json');


function readJsonFile(file) {
    return fs.readFileSync(file);
}

const Meal = JSON.parse(readJsonFile(meal));


module.exports = {
    create(req, res) {
        Meal.push(req.body)
        const newMealIndex = Meal.findIndex(meal => meal.name == req.body.name);
        return res.status(201).send(Meal[newMealIndex]);
    },
    list(req, res) {
        return res.status(200).send(Meal);
    },
    update(req, res) {
        const mealIndex = Meal.findIndex(meal => meal.id == req.params.id)
        if (mealIndex == -1) {
            return res.status(404).send({
                message: "Meal Not Found"
            });
        }
        const updatedMeal = {...Meal[mealIndex], ...req.body };
        Meal.splice(mealIndex, 1, updatedMeal);
        return res.status(200).send(updatedMeal);
    },
    destroy(req, res) {
        const mealIndex = Meal.findIndex(meal => meal.id == req.params.id)

        if (mealIndex == -1) {
            return res.status(404).send({
                message: 'Meal Not Found'
            });
        }
        Meal.splice(mealIndex, 1);
        return res.status(204).send();

    }
};