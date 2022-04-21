import log4js from "../utils/logger.js";
const loggerApi = log4js.getLogger("apisError");

import {productsDao} from "../models/daos/index.js";
//import SingletonClass from "../models/daos/index.js";
//const {productsDao} = SingletonClass.getInstance();

class ProductApi {
	constructor() {
		this.ProductApi = productsDao;
	}

	async getAll() {
		try {
			return await this.ProductApi.getAll();
		} catch (error) {
			loggerApi.error("The products cannot be written.");
		}
	}
	async addProduct(newProduct) {
		try {
			await this.ProductApi.add(newProduct);
			loggerApi.info("Product saved successfully");
		} catch (error) {
			loggerApi.error("The product cannot be written.");
		}
	}

	async getById(id) {
		try {
			const product = await this.ProductApi.getById(id);
			return product;
		} catch (error) {
			loggerApi.error("The products cannot be read.");
		}
	}
	async getFormEdit(id) {
		try {
			const product = await this.ProductApi.getById(id);
			return product;
		} catch (error) {
			loggerApi.error(error);
		}
	}
	async editById(id, productUpd) {
		try {
			const product = await this.ProductApi.editById(id, productUpd);
			return product;
		} catch (error) {
			loggerApi.error("The product cannot be edited.");
		}
	}
	async deleteById(id) {
		try {
			const productDel = await this.ProductApi.deleteById(id);
			return productDel;
		} catch (error) {
			loggerApi.error("The product cannot be deleted.");
		}
	}
}

export default ProductApi;
