import log4js from "../utils/logger.js";
const loggerRoute = log4js.getLogger("routeNotExist");

import ProductApi from "../services/productServices.js";
const product = new ProductApi();

import CartApi from "../services/cartsServices.js";
const cart = new CartApi();

class HomeController {
	constructor() {}
	async getHome(req, res) {
		try {
			const {user, query} = req;
			if (query.statusCart) {
				cart.addCart({userId: user._id});
			}
			const products = await product.getAll();
			if (products.length > 0) {
				return res.render("pages/home", {
					title: "List of products",
					data: products,
					dataUser: user,
				});
			}
			return res.render("pages/home", {data: false, dataUser: user});
		} catch (error) {
			loggerRoute.warn(error);
			res.json({
				error: -1,
				descripcion: `route ${req.url} method '${req.method}' not authorized`,
			});
		}
	}
}

export default HomeController;
