import log4js from "../utils/logger.js";
const loggerApi = log4js.getLogger("apisError");

import {usersDao} from "../models/daos/index.js";
//import SingletonClass from "../models/daos/index.js";
//const {usersDao} = SingletonClass.getInstance();

class UserApi {
	constructor() {
		this.UserApi = usersDao;
	}

	async add(newUser) {
		try {
			return await this.UserApi.add(newUser);
		} catch (error) {
			loggerApi.error("The product cannot be written.");
		}
	}

	async getById(id) {
		try {
			return await this.UserApi.getById(id);
		} catch (error) {
			loggerApi.error("The user cannot be read.");
		}
	}

	async findUser(userEmail) {
		try {
			return await this.UserApi.findUser(userEmail);
		} catch (error) {
			loggerApi.error("The user cannot be read.");
		}
	}

	async ifExist(userName) {
		try {
			return await this.UserApi.ifExist(userName);
		} catch (error) {
			loggerApi.error("The user cannot be read.");
		}
	}
}

export default UserApi;
