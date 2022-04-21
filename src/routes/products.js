import express from "express";
const {Router} = express;
const router = new Router();

import ProductsController from "../controllers/ProductsController.js";
const controller = new ProductsController();

//Add
router.get("/form", controller.getFormAdd);
router.post("/add", controller.addProduct);

//Get by id
router.get("/:id", controller.getById);

//Edit
router.get("/form/:id", controller.getFormEdit);
router.put("/:id", controller.editById);

//Delete
router.delete("/:id", controller.deleteByid);

export default router;
