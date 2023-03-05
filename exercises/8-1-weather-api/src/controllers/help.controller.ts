import express, { Request, Response } from "express";
import { getText } from "../services/help.service";

const helpRouter = express.Router();

helpRouter.get("/", async (req: Request, res: Response) => {
  res.send(getText());
});

export default helpRouter;
