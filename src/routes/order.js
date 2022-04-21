import express from "express";
const {Router} = express;
const router = new Router();

import OrderController from "../controllers/OrderController.js";
const controller = new OrderController();

//Make an order
router.post("/:userId", controller.makeOrder);

export default router;
