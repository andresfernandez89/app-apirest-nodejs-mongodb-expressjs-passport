import express from "express";
const {Router} = express;
const router = new Router();

import CartController from "../controllers/CartController.js";
const controller = new CartController();

//Add cart
router.post("/", controller.addCart);

//Delete cart
router.delete("/:userId", controller.deleteByUserId);

//Empty cart
router.post("/:cartId", controller.emptyCart);

//Get
router.get("/:userId/products", controller.getById);

//Add product to Cart
router.post("/:userId/products", controller.addProductCart);

//Delete product of cart
router.delete("/:userId/products/:productId", controller.deleteProductCart);

export default router;
