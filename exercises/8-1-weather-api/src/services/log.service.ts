import chalk from "chalk";

const printError = (error: string) => {
  console.log(`${chalk.red("ERROR:")} ${error}`);
};

const printSuccess = (message: string) => {
  console.log(`${chalk.green("Success:")} ${message}`);
};

const showInroduction = () => {
  console.log(`
  ${chalk.inverse("Добро пожаловать!".toUpperCase())}
  Для того, что настроить проект для корректной работы,
  нужно прочитать раздел помощи, находящийся по адресу ${chalk.bold(
    "[GET /help]"
  )}`);
};

export { printError, printSuccess, showInroduction };
