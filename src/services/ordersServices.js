import log4js from "../utils/logger.js";
const loggerApi = log4js.getLogger("apisError");

import {ordersDao, usersDao, cartsDao} from "../models/daos/index.js";
//import SingletonClass from "../models/daos/index.js";
//const {ordersDao, usersDao, cartsDao} = SingletonClass.getInstance();

import transporter from "../utils/nodemailer.js";
import client from "../utils/twilio.js";

class OrderApi {
	constructor() {
		this.OrderApi = ordersDao;
		this.UserApi = usersDao;
		this.CartApi = cartsDao;
	}

	async makeOrder(id) {
		try {
			const user = await this.UserApi.getById(id);
			const cartUser = await this.CartApi.getByUserId(id);
			const newOrder = {
				userId: cartUser.userId,
				products: cartUser.products,
			};
			const order = await this.OrderApi.add(newOrder);
			//Twilio whatsApp
			const message1 = await client.messages.create({
				body: `New order from ${user.userName}`,
				from: "whatsapp:+14155238886",
				to: "whatsapp:+5492236150380",
			});

			//Twilio SMS
			const message2 = await client.messages.create({
				body: `Your order N°${order._id} is in progress!`,
				from: "+18124899160",
				to: "+5492236150380", //aca pondriamos cel del usuario user.userPhone
			});

			//Nodemailer
			const mailOptions = {
				from: "Servidor Node.js",
				to: "andres_f89@hotmail.com", //aca pondriamos mail del usuario user.userEmail
				subject: `New order from ${user.userName}`,
				html: `<h1 style="color: blue;">New order from ${user.userName}</h1>
                <h2>List of products:</h2>
                ${cartUser.products.map((element) => {
									return `<p>${element.title}</p>`;
								})}`,
			};
			await transporter.sendMail(mailOptions);
			cartUser.products = [];
			this.CartApi.editById(cartUser._id, cartUser);
			return order;
		} catch (error) {
			loggerApi.error(error);
		}
	}
}

export default OrderApi;
