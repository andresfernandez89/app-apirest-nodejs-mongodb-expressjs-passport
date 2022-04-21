import log4js from "../utils/logger.js";
const loggerRoute = log4js.getLogger("routeNotExist");

import OrderApi from "../services/ordersServices.js";
const order = new OrderApi();

class OrderController {
	constructor() {}
	async makeOrder(req, res) {
		try {
			return await order.makeOrder(req.params.userId, req.body.cartId);
		} catch (error) {
			loggerRoute.warn(error);
			res
				.status(404)
				.json({error: -2, descripcion: `route ${req.url} method '${req.method}' not authorized`});
		}
	}
}

export default OrderController;
