import { Request, Response, NextFunction } from "express";
import { STORAGE_KEYS } from "../storage.service.types";

export const validSetKeysMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

  next();
}
