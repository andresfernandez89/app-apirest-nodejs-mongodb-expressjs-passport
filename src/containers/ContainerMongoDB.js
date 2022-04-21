import mongoose from "mongoose";

import log4js from "../utils/logger.js";
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger("apisError");

class ContainerMongoDB {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}

	async getAll() {
		try {
			return await this.collection.find({}, {__v: 0});
		} catch (error) {
			loggerApi.error("The file cannot be read.");
		}
	}

	async getById(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = await this.collection.find({_id: id}, {__v: 0});
				if (obj) return obj[0];
				return null;
			}
		} catch (error) {
			loggerApi.error("The file cannot be read.");
		}
	}

	async add(data) {
		try {
			return await this.collection({...data}).save();
		} catch (error) {
			loggerApi.error("The file cannot be written.");
			loggerApi.error(error);
		}
	}

	async editById(id, obj) {
		try {
			const dataUpdate = await this.collection.findByIdAndUpdate(id, obj, {
				new: true,
			});
			return dataUpdate;
		} catch (error) {
			loggerApi.error("The file cannot be written.");
		}
	}
	async deleteById(id) {
		try {
			return await this.collection.deleteOne({_id: id});
		} catch (error) {
			loggerApi.error("The file cannot be deleted.");
		}
	}

	async deleteAll() {
		try {
			return await this.collection.deleteMany();
		} catch (error) {
			logger.error("The file cannot be deleted.");
		}
	}

	async ifExist(objData) {
		try {
			const obj = await this.collection.findOne(objData);
			if (obj) return true;
			return false;
		} catch (error) {
			loggerApi.error("The file cannot be read.");
		}
	}
}

export default ContainerMongoDB;
