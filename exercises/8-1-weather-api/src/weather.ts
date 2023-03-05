import express, { Express, Router } from "express";
import envVariables from "./common/envVariables";
import forecastRouter from "./controllers/forecast.controller";
import helpRouter from "./controllers/help.controller";
import storageRouter from "./controllers/storage.controller";
import { printSuccess, showInroduction } from "./services/log.service";

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
    showInroduction();
  });
};

init();
