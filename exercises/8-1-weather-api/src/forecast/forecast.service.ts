import axios, { AxiosResponse } from "axios";
import envVariables from "../common/envVariables";
import { OpenDataWeatherResponse, Params } from "./forecast.service.types";
import { getKeyValue } from "../storage/storage.service";
import { STORAGE_KEYS } from "../storage/storage.service.types";
import { getWeatherText } from "../template/template.service";

const fetchData = (
  token: string,
  city: string
): Promise<AxiosResponse<OpenDataWeatherResponse>> => {
  return axios.get(envVariables?.FORECAST_API_URL || "", {
    params: {
      q: city,
      appid: String(token),
      lang: "ru",
      units: "metric",
    },
  });
};

export const getForecast = async (params: Params): Promise<string | Error> => {
  try {
    const city = params.city || (await getKeyValue(STORAGE_KEYS.CITY));
    if (!city) {
      throw new Error("Не установлен город");
    }

    const token = params.token || (await getKeyValue(STORAGE_KEYS.TOKEN));

    if (!token) {
      throw new Error("Не установлен код доступа к сервису");
    }

    const { data } = await fetchData(String(token), String(city));
    return getWeatherText(data);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Неизвестная ошибка");
  }
};
