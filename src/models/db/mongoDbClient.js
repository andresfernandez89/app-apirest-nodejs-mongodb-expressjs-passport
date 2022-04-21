import mongoose from "mongoose";
import config from "../config/config.js";

import log4js from "../../utils/logger.js";
const logger = log4js.getLogger();

class MyMongoDbClient {
	constructor() {
		this.connected = false;
		this.client = mongoose;
	}

	async connect() {
		try {
			await this.client.connect(config.mongoDB.cnx, config.mongoDB.options);
			logger.info("Database Connected");
		} catch (error) {
			logger.error("Failed to connect to Database");
			throw "Failed to connect to Database";
		}
	}

	async disconnect() {
		try {
			await this.client.close();
			logger.info("Database Disconnected");
		} catch (error) {
			logger.error("Failed to disconnect to Database");
			throw "Failed to disconnect to Database";
		}
	}
}

export default MyMongoDbClient;
