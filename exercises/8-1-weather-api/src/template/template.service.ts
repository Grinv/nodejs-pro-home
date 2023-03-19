import chalk from "chalk";
import dedent from "dedent-js";
import { OpenDataWeatherResponse } from "../forecast/forecast.service.types";

const WEATHER_ICONS: Record<string, string> = {
  "01d": "☀️",
  "02d": "🌤️",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧️",
  "10d": "🌦️",
  "11d": "🌩️",
  "13d": "❄️",
  "50d": "🌫️",
};

export const getHelpText = (): string => {
  return `
  ПОГОДА:
  - [GET /forecast]: выводит информацию о погоде. Для этого нужны значения city и token. Их можно сохранить либо через [PATCH /storage] либо передать в body текущего запроса;

  ХРАНИЛИЩЕ:
  - [GET /storage/:key]: возвращает значение, которое локально хранится по ключу. Если значения нет - вернёт статус 204;
  - [PATCH /storage]: сохраняет данные в локальное хранилище. Принимает значение в body в виде объекта {key, value};

  ПОМОЩЬ:
  - [GET /help]: вывод помощи;`;
};

export const getInroductionText = () => {
  return `
  ${chalk.inverse("Добро пожаловать!".toUpperCase())}
  Для того, что настроить проект для корректной работы,
  нужно прочитать раздел помощи, находящийся по адресу ${chalk.bold("[GET /help]")}`;
};

export const getWeatherText = (data: OpenDataWeatherResponse): string => {
  return dedent`Погода в городе ${data.name}
    ${WEATHER_ICONS[data.weather[0].icon] ?? ""}  ${data.weather[0].description}
    Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
    Влажность: ${data.main.humidity}%
    Скорость ветра: ${data.wind.speed}`;
};

