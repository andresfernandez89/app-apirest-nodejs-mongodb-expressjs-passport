import log4js from "../utils/logger.js";
const loggerRoute = log4js.getLogger("routeNotExist");

import CartApi from "../services/cartsServices.js";
const cart = new CartApi();

class AuthController {
	constructor() {}

	async getSignup(req, res) {
		try {
			res.render("pages/signup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async getLogin(req, res) {
		try {
			res.render("pages/login");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async getFailSignup(req, res) {
		try {
			res.render("pages/failSignup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getFailLogin(req, res) {
		try {
			res.render("pages/failLogin");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async postLogout(req, res) {
		try {
			await cart.deleteByUserId(req.body.userId);
			let nameUser = req.user.userName;
			req.logout();
			res.render("pages/logout", {nameUser});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

export default AuthController;
