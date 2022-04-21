import {createTransport} from "nodemailer";

import config from "../models/config/config.js";

const transporter = createTransport(config.nodemailer);

export default transporter;
