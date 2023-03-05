import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";
import { KeyValueObject, STORAGE_KEYS } from "./storage.service.types";
import envVariables from "../common/envVariables";

const filePath = join(homedir(), envVariables?.STORAGE_FILENAME || "");

const saveKeyValue = async (
  newProps: KeyValueObject | KeyValueObject[]
): Promise<void> => {
  let data: Record<string, string | number> = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file.toString());
  }
  if (Array.isArray(newProps)) {
    newProps.forEach((newProp: KeyValueObject) => {
      data[newProp.key] = newProp.value;
    });
  } else {
    data[newProps.key] = newProps.value;
  }
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (
  key: STORAGE_KEYS
): Promise<string | number | undefined> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file.toString());
    return data[key];
  }
  return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue };
