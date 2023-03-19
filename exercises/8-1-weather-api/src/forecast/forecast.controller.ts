import express, { Request, Response } from "express";
import { getForecast } from "./forecast.service";

const forecastRouter = express.Router();

forecastRouter.get("/", async (req: Request, res: Response) => {
  try {
    const forecast = await getForecast(req.query);
    res.status(200).send(forecast);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Неизвестная ошибка";
    res.status(500).send(errMsg);
  }
});

export default forecastRouter;
