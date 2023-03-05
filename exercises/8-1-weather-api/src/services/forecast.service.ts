import axios, { AxiosResponse } from "axios";
import dedent from "dedent-js";
import envVariables from "../common/envVariables";
import { OpenDataWeatherResponse, Params } from "./forecast.service.types";
import { getKeyValue } from "./storage.service";
import { STORAGE_KEYS } from "./storage.service.types";

const WEATHER_ICONS: Record<string, string> = {
  "01": "☀️",
  "02": "🌤️",
  "03": "☁️",
  "04": "☁️",
  "09": "🌧️",
  "10": "🌦️",
  "11": "🌩️",
  "13": "❄️",
  "50": "🌫️",
};

export const getIcon = (iconCode: string): string => {
  const iconCodeNumber = iconCode.slice(0, -1);
  return WEATHER_ICONS[iconCodeNumber] ?? "";
};

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
    return printWeather(data);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Неизвестная ошибка");
  }
};

const printWeather = (data: OpenDataWeatherResponse): string => {
  return dedent`Погода в городе ${data.name}
    ${getIcon(data.weather[0].icon)}  ${data.weather[0].description}
    Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
    Влажность: ${data.main.humidity}%
    Скорость ветра: ${data.wind.speed}`;
};
