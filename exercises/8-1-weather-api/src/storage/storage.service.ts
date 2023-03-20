import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";
import { KeyValueObject, STORAGE_KEYS } from "./storage.service.types";
import envVariables from "../common/envVariables";

const filePath = join(homedir(), envVariables?.STORAGE_FILENAME || "");

const getFileData = async (): Promise<Partial<Record<STORAGE_KEYS, string | number>>> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    return JSON.parse(file.toString());
  }
  return {};
}

const saveKeyValue = async (
  newProps: KeyValueObject[]
): Promise<void> => {
  const fileData = await getFileData();

  newProps.forEach((newProp: KeyValueObject) => {
    fileData[newProp.key] = newProp.value;
  });

  await promises.writeFile(filePath, JSON.stringify(fileData));
};

const getKeyValue = async (
  key: STORAGE_KEYS
): Promise<string | number | undefined> => {
  const fileData = await getFileData();
  return fileData[key];
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
