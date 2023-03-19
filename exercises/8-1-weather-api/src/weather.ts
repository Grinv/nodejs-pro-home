import express, { Express, Router } from "express";
import envVariables from "./common/envVariables";
import forecastRouter from "./forecast/forecast.controller";
import helpRouter from "./help/help.controller";
import storageRouter from "./storage/storage.controller";
import { printSuccess } from "./logger/logger.service";
import { getInroductionText } from "./template/template.service";

const ROUTES: Record<string, Router> = {
  "/forecast": forecastRouter,
  "/help": helpRouter,
  "/storage": storageRouter,
};

const implementRoutes = (app: Express) => {
  Object.entries(ROUTES).map(([path, router]) => {
    app.use(path, router);
    printSuccess(`🏃 Роут ${path} подключен`);
  });
};

const init = (): void => {
  const app = express();
  app.use(express.json());
  implementRoutes(app);

  app.listen(envVariables?.PORT, () => {
    printSuccess(
      `💻 Сервер запущен по адресу: http://localhost:${envVariables?.PORT}`
    );
    console.log(getInroductionText());
  });
};

init();
