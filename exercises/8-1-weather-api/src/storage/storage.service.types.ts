export enum STORAGE_KEYS {
  TOKEN = "token",
  CITY = "city",
}

export interface KeyValueObject {
  key: STORAGE_KEYS;
  value: string | number;
}
