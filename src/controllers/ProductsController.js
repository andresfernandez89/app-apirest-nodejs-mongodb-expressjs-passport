import log4js from "../utils/logger.js";
const loggerRoute = log4js.getLogger("routeNotExist");

import ProductApi from "../services/productServices.js";
const product = new ProductApi();

class ProductsController {
	constructor() {}

	async getFormAdd(req, res) {
		try {
			return res.render("pages/addProduct", {title: "Add Product"});
		} catch (error) {
			loggerRoute.warn(error);
			res.status(401).json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async addProduct(req, res) {
		try {
			await product.addProduct(req.body);
			res.redirect("/home");
		} catch (error) {
			loggerRoute.warn(error);
			res.json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async getById(req, res) {
		try {
			const pr = await product.getById(req.params.id);
			return res.render("pages/product", {title: "Product Detail", data: pr});
		} catch (error) {
			loggerRoute.warn(error);
			res.json({error: -1, descripcion: `route ${req.url} method '${req.method}' not authorized`});
		}
	}

	async getFormEdit(req, res) {
		try {
			const pr = await product.getById(req.params.id);
			return res.render("pages/editProduct", {title: "Edit Product", data: pr});
		} catch (error) {
			loggerRoute.warn(error);
			res.json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async editById(req, res) {
		try {
			await product.editById(req.params.id, req.body);
			res.redirect("/home");
		} catch (error) {
			loggerRoute.warn(error);
			res.json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async deleteByid(req, res) {
		try {
			await product.deleteById(req.params.id);
			return res.render("/home");
		} catch (error) {
			loggerRoute.warn(error);
			res.json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}
}

export default ProductsController;
