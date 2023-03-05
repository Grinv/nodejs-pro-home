import { config } from "dotenv";
import { printSuccess } from "../services/log.service";

export default config().parsed;
printSuccess("🗄️  Файл .env подключен");
