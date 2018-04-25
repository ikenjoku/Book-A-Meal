import express from 'express';
import menuController from '../controllers/menu';

const menuRouter = express.Router();

menuRouter.get('/', menuController.listMenu);
menuRouter.post('/', menuController.createMenu);
