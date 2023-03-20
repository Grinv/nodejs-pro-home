import { config } from "dotenv";
import { printSuccess } from "../logger/logger.service";

export default config().parsed;
printSuccess("🗄️  Файл .env подключен");
