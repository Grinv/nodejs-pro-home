module.exports = async function calc() {
  try {
    if (process.argv.length < 5) {
      throw "Недостаточно аргументов";
    }

    const [nodePath, appPath, firstNum, secondNum, operationType] =
      process.argv;

    let operation;

    try {
      operation = require(`./operations/${operationType}.js`);
    } catch {
      throw `Операции ${operationType} не существует`;
    }

    const result = operation(parseInt(firstNum), parseInt(secondNum));

    if (typeof result === "number" && !isNaN(result)) {
      return console.log(`Результат: ${result}`);
    }

    throw "Неверные параметры";
  } catch (error) {
    console.error(error);
  }
};
