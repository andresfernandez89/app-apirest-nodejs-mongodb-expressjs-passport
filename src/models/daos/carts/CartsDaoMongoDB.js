import ContainerMongoDB from "../../../containers/ContainerMongoDB.js";
import mongoose from "mongoose";

import log4js from "../../../utils/logger.js";
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger("apisError");

export default class CartsDaoMongoDB extends ContainerMongoDB {
	constructor() {
		super(
			"cart",
			new mongoose.Schema({
				timestamps: {type: Date},
				userId: {type: String, required: true, unique: true},
				products: Array,
			})
		);
	}

	async getByUserId(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = await this.collection.find({userId: id}, {__v: 0});
				if (obj) return obj[0];
				return null;
			}
		} catch (error) {
			loggerApi.error("The file cannot be read.");
		}
	}

	async addProduct(id, newProduct) {
		try {
			const {_id} = await this.getByUserId(id);
			const cart = await this.getById(_id);
			cart.products.push(newProduct);
			if (cart) {
				const data = await this.collection.findByIdAndUpdate(
					_id,
					{$set: {products: cart.products}},
					{
						new: true,
					}
				);
			}
		} catch (error) {
			loggerApi.error("The file cannot be written.");
		}
	}
	async deleteProduct(idProduct, id) {
		try {
			const {_id} = await this.getByUserId(id);
			const cart = await this.getById(_id);
			if (cart) {
				let prFind = await cart.products.filter((element) => element._id != idProduct);
				cart.products = prFind;
				this.editById(_id, cart);
			}
		} catch (error) {
			loggerApi.error("The file cannot be written.");
		}
	}
}
