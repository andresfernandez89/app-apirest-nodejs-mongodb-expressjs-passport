import log4js from "../utils/logger.js";
const loggerRoute = log4js.getLogger("routeNotExist");

import CartApi from "../services/cartsServices.js";
const cart = new CartApi();

import ProductApi from "../services/productServices.js";
const product = new ProductApi();

class CartController {
	constructor() {}

	async addCart(req, res) {
		try {
			cart.addCart({...req.body});
			res.send("Cart Created");
		} catch (error) {
			loggerRoute.warn(error);
			res.status(404).json({
				error: -2,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async getById(req, res) {
		try {
			const {user} = req;
			const cartUser = await cart.getByUserId(req.params.userId);
			res.render("pages/cart", {dataUser: user, cart: cartUser});
		} catch (error) {
			loggerRoute.warn(error);
			res
				.status(404)
				.json({error: -2, descripcion: `route ${req.url} method '${req.method}' not authorized`});
		}
	}

	async deleteByUserId(req, res) {
		try {
			await cart.deleteByUserId(req.params.userId);
			res.send("Cart Removed");
		} catch (error) {
			loggerRoute.warn(error);
			res.status(404).json({
				error: -2,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}
	async emptyCart(req, res) {
		try {
			const cartUser = await cart.getById(req.params.cartId);
			cartUser.products = req.body.products;
			await cart.editById(req.params.cartId, cartUser);
			res.send("Empty Cart");
		} catch (error) {
			loggerRoute.warn(error);
			res.status(404).json({
				error: -2,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}

	async addProductCart(req, res) {
		try {
			const newProduct = await product.getById(req.body.id_newProd);
			await cart.addProductCart(req.params.userId, newProduct);
			res.send("Added product");
		} catch (error) {
			loggerRoute.warn(error);
			res.status(404).json({
				error: -2,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}
	async deleteProductCart(req, res) {
		try {
			await cart.deleteProductCart(req.params.userId, req.params.productId);
			res.send("Product Deleted");
		} catch (error) {
			loggerRoute.warn(error);
			res
				.status(404)
				.json({error: -2, descripcion: `route ${req.url} method '${req.method}' not authorized`});
		}
	}
}

export default CartController;
