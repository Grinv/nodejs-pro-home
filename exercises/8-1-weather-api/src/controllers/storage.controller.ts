import express, { Request, Response } from "express";
import { getKeyValue, saveKeyValue } from "../services/storage.service";
import {
  KeyValueObject,
  STORAGE_KEYS,
} from "../services/storage.service.types";

const storageRouter = express.Router();

storageRouter.get("/:key", async (req: Request, res: Response) => {
  const key = req.params.key as STORAGE_KEYS;

  if (!key || !Object.values(STORAGE_KEYS).includes(key)) {
    return res.status(400).send(`Ключ "${key}" не существует`);
  }

  const value = await getKeyValue(key);

  if (!value) {
    return res.sendStatus(204);
  }

  res.status(200).send(value);
});

storageRouter.patch("/", async (req: Request, res: Response) => {
  const data = Object.entries(req.body);

  if (data.length === 0) {
    return res
      .status(400)
      .send(
        `Введите параметры для сохранения (${STORAGE_KEYS.CITY} или ${STORAGE_KEYS.TOKEN})`
      );
  }

  if (
    data.some(
      ([key]) => !Object.values(STORAGE_KEYS).includes(key as STORAGE_KEYS)
    )
  ) {
    return res
      .status(400)
      .send("Один из ключей введёт неправильно. Пожалуйста проверьте.");
  }

  await saveKeyValue(
    data.map(([key, value]) => ({ key, value: value } as KeyValueObject))
  );

  res.status(201).send();
});

export default storageRouter;
