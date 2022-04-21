//const env = "mongodb";
import MyMongoDbClient from "../db/mongoDbClient.js";
const MyClient = new MyMongoDbClient();

//let instance = null;
let usersDao;
let productsDao;
let cartsDao;
let ordersDao;
let chatsDao;

switch (process.env.NODE_ENV) {
	case "production":
		{
			switch (process.env.DB) {
				case "mongodb":
					MyClient.connect();
					const {default: UsersDaoMongoDB} = await import("./users/UsersDaoMongoDB.js");
					const {default: ProductsDaoMongoDB} = await import("./products/ProductsDaoMongoDB.js");
					const {default: CartsDaoMongoDB} = await import("./carts/CartsDaoMongoDB.js");
					const {default: OrdersDaoMongoDB} = await import("./orders/OrdersDaoMongoDB.js");
					const {default: ChatsDaoMongoDB} = await import("./chats/ChatsDaoMongoDB.js");
					usersDao = new UsersDaoMongoDB();
					productsDao = new ProductsDaoMongoDB();
					cartsDao = new CartsDaoMongoDB();
					ordersDao = new OrdersDaoMongoDB();
					chatsDao = new ChatsDaoMongoDB();
					break;
				default:
					break;
			}
		}
		break;
	default:
		break;
}

export {usersDao, productsDao, cartsDao, ordersDao, chatsDao};
/* class SingletonClass {
	constructor() {
		this.usersDao = usersDao;
		this.productsDao = productsDao;
		this.cartsDao = cartsDao;
		this.ordersDao = ordersDao;
		this.chatsDao = chatsDao;
	}
	static async getInstance() {
		if (!instance) {
			switch (process.env.DB) {
				case "mongodb":
					MyClient.connect();
					const {default: UsersDaoMongoDB} = await import("./users/UsersDaoMongoDB.js");
					const {default: ProductsDaoMongoDB} = await import("./products/ProductsDaoMongoDB.js");
					const {default: CartsDaoMongoDB} = await import("./carts/CartsDaoMongoDB.js");
					const {default: ChatsDaoMongoDB} = await import("./chats/ChatsDaoMongoDB.js");
					usersDao = new UsersDaoMongoDB();
					productsDao = new ProductsDaoMongoDB();
					cartsDao = new CartsDaoMongoDB();
					ordersDao = new OrdersDaoMongoDB();
					chatsDao = new ChatsDaoMongoDB();
					break;
				default:
					break;
			}
			instance = new SingletonClass();
		}
		return instance;
	}
}

export default SingletonClass; */
