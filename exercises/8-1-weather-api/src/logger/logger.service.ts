import chalk from "chalk";

const printError = (error: string) => {
  console.log(`${chalk.red("ERROR:")} ${error}`);
};

const printSuccess = (message: string) => {
  console.log(`${chalk.green("Success:")} ${message}`);
};

export { printError, printSuccess };
