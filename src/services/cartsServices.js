import log4js from "../utils/logger.js";
const loggerApi = log4js.getLogger("apisError");

import {cartsDao} from "../models/daos/index.js";
//import SingletonClass from "../models/daos/index.js";
//const {cartsDao} = SingletonClass.getInstance();

class CartApi {
	constructor() {
		this.CartApi = cartsDao;
	}

	async addCart(newCart) {
		try {
			return await this.CartApi.add(newCart);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async getById(id) {
		try {
			return await this.CartApi.getById(id);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async getByUserId(id) {
		try {
			return await this.CartApi.getByUserId(id);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async editById(id, cartUpd) {
		try {
			return await this.CartApi.editById(id, cartUpd);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async deleteByUserId(id) {
		try {
			const {_id} = await this.CartApi.getByUserId(id);
			return await this.CartApi.deleteById(_id);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async addProductCart(id, newProduct) {
		try {
			return await this.CartApi.addProduct(id, newProduct);
		} catch (error) {
			loggerApi.error(error);
		}
	}
	async deleteProductCart(id, idProduct) {
		try {
			return await this.CartApi.deleteProduct(id, idProduct);
		} catch (error) {
			loggerApi.error(error);
		}
	}
}

export default CartApi;
