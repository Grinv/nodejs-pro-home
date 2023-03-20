import express, { Request, Response } from "express";
import { getHelpText } from "../template/template.service";

const helpRouter = express.Router();

helpRouter.get("/", async (req: Request, res: Response) => {
    res.send(getHelpText());
});

export default helpRouter;
