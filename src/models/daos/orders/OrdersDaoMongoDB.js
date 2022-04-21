import ContainerMongoDB from "../../../containers/ContainerMongoDB.js";
import mongoose from "mongoose";

export default class OrdersDaoMongoDB extends ContainerMongoDB {
	constructor() {
		super(
			"order",
			new mongoose.Schema({
				timestamps: {type: Date},
				userId: {type: String, required: true},
				products: Array,
			})
		);
	}
}
