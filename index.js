//Express
import express from "express";

//Cluster
import cluster from "cluster";
import {cpus} from "os";
const numCPUs = cpus().length;

//Dotenv
import "dotenv/config";
import config from "./src/models/config/config.js";

//Cors
import cors from "cors";

//Minimist
import parseArg from "minimist";

//Logger
import log4js from "./src/utils/logger.js";
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger("apisError");

//Sessions
import session from "express-session";
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

//Passport
import passport from "passport";

//MongoDB
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

//Auth
import authorize from "./src/utils/auth.js";

//Chat Services
import ChatApi from "./src/services/chatsServices.js";
const chat = new ChatApi();

//Routes
import sessionRoutes from "./src/routes/auth.js";
import homeRoutes from "./src/routes/home.js";
import productsRoutes from "./src/routes/products.js";
import cartRoutes from "./src/routes/cart.js";
import userRoutes from "./src/routes/user.js";
import orderRoutes from "./src/routes/order.js";

const {PORT, SERVER} = parseArg(process.argv.slice(2), {
	default: {PORT: process.env.PORT, SERVER: "FORK"},
});
//Socket
import http from "http";
import {Server} from "socket.io";

if (cluster.isPrimary && SERVER === "CLUSTER") {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => logger.info(`Worker ${worker.process.pid} died.`));
} else {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server);
	//Engine
	app.set("views", process.cwd() + "/src/views");
	app.set("view engine", "ejs");

	//Middleware
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(cors());
	app.use(express.static(process.cwd() + "/public"));
	app.use(
		session({
			secret: config.mongoDB.secret,
			store: MongoStore.create({
				mongoUrl: config.mongoDB.cnx,
				mongoOptions: advancedOptions,
			}),
			resave: true,
			saveUninitialized: true,
			rolling: true,
			cookie: {maxAge: 600000},
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use("/", sessionRoutes);
	app.use("/home", authorize, homeRoutes);
	app.use("/api/products", authorize, productsRoutes);
	app.use("/api/cart", authorize, cartRoutes);
	app.use("/api/user", authorize, userRoutes);
	app.use("/api/order", authorize, orderRoutes);

	app.use(function (req, res, next) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	});

	io.on("connection", async (socket) => {
		try {
			logger.info("Connected client");
			let data = await chat.getAll();
			if (data.length > 0) return io.sockets.emit("chat", data);
		} catch (error) {
			logger.error(error);
		}

		socket.on("msn", async (msn) => {
			try {
				await chat.addChat(msn);
				io.sockets.emit("email", msn.email);
				let data = await chat.getAll();
				if (data.length > 0) return io.sockets.emit("chat", data);
			} catch (error) {
				logger.error(error);
			}
		});

		socket.on("disconnect", () => {
			try {
				chat.deleteAll();
				logger.info("User disconnected");
			} catch (error) {
				logger.error(error);
			}
		});
	});

	server.listen(PORT, async () => {
		logger.info(`Servidor http escuchando en el puerto: ${server.address().port}`);
	});

	server.on("error", (error) => loggerApi.error(`Error en servidor: ${error}`));
}
