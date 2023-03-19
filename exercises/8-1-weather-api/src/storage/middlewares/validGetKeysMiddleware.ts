import { Request, Response, NextFunction } from "express";
import { STORAGE_KEYS } from "../storage.service.types";

export const validGetKeysMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = req.params.key as STORAGE_KEYS;

  if (!key || !Object.values(STORAGE_KEYS).includes(key)) {
    return res.status(400).send(`Ключ "${key}" не существует`);
  }

  next();
}
