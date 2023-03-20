import express, { Request, Response } from "express";
import { getKeyValue, saveKeyValue } from "../storage/storage.service";
import {
  KeyValueObject,
  STORAGE_KEYS,
} from "../storage/storage.service.types";
import { validGetKeysMiddleware } from "./middlewares/validGetKeysMiddleware";
import { validSetKeysMiddleware } from "./middlewares/validSetKeysMiddleware";

const storageRouter = express.Router();

storageRouter.get("/:key", validGetKeysMiddleware, async (req: Request, res: Response) => {
  const key = req.params.key as STORAGE_KEYS;

  const value = await getKeyValue(key);

  if (!value) {
    return res.sendStatus(204);
  }

  res.status(200).send(value);
});

storageRouter.patch("/", validSetKeysMiddleware, async (req: Request, res: Response) => {
  const data = Object.entries(req.body);

  await saveKeyValue(
    data.map(([key, value]) => ({ key, value: value } as KeyValueObject))
  );

  res.status(201).send();
});

export default storageRouter;
