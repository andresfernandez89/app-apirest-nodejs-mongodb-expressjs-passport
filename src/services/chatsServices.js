import log4js from "../utils/logger.js";
const loggerApi = log4js.getLogger("apisError");

import {chatsDao} from "../models/daos/index.js";
//import SingletonClass from "../models/daos/index.js";
//const {chatsDao} = SingletonClass.getInstance();

class ChatApi {
	constructor() {
		this.ChatApi = chatsDao;
	}

	async getAll() {
		try {
			return await this.ChatApi.getAll();
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async addChat(data) {
		try {
			let msn = {
				author: {
					id: data.email,
					name: data.name,
					lastname: data.lastname,
				},
				date: data.date,
				message: data.message,
			};
			return await this.ChatApi.add(msn);
		} catch (error) {
			loggerApi.error(error);
		}
	}

	async deleteAll() {
		try {
			return await this.ChatApi.deleteAll();
		} catch (error) {
			loggerApi.error(error);
		}
	}
}

export default ChatApi;
