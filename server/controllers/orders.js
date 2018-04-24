import path from 'path';
import fs from 'fs';
const orders = path.join(__dirname, '/data/orders.json');


function readJsonFile(file) {
    return fs.readFileSync(file);
}

const Order = JSON.parse(readJsonFile(orders));


module.exports = {
    create(req, res) {
        Order.push(req.body)
        const newOrderIndex = Order.findIndex(order => order.id == req.body.id);
        return res.status(201).send(Order[newOrderIndex]);
    },
    list(req, res) {
        return res.status(200).send(Order);
    },
    update(req, res) {
        const orderIndex = Order.findIndex(order => order.id == req.params.orderId)
        if (orderIndex == -1) {
            return res.status(404).send({
                message: "Order Not Found"
            });
        }
        const updatedOrder = {...Order[orderIndex], ...req.body };
        Order.splice(orderIndex, 1, updatedOrder);
        return res.status(200).send(updatedOrder);
    }
};