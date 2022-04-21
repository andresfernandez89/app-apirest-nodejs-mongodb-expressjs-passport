import ContainerMongoDB from "../../../containers/ContainerMongoDB.js";
import mongoose from "mongoose";

import log4js from "../../../utils/logger.js";
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger("apisError");

export default class UsersDaoMongoDB extends ContainerMongoDB {
	constructor() {
		super(
			"user",
			new mongoose.Schema({
				userEmail: {type: String, required: true, unique: true},
				password: {type: String, required: true},
				userName: {type: String, required: true},
				userPhone: {type: Number, required: true},
				userAddress: {type: String, required: true},
				userRole: {type: String, enum: ["user", "admin"], default: "user"},
				timestamps: {type: Date},
				userPhoto: {type: String, required: true},
			})
		);
	}

	async findUser(useremail) {
		try {
			const user = await this.collection.findOne({userEmail: useremail});
			return user;
		} catch (error) {
			loggerApi.error("The file cannot be read.");
		}
	}
}
