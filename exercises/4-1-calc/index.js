function getOperationExecutor(operationType) {
  try {
    return require(`./operations/${operationType}.js`);
  } catch {
    throw `Операции ${operationType} не существует`;
  }
}

module.exports = async function calc() {
  try {
    if (process.argv.length < 5) {
      throw "Недостаточно аргументов";
    }

    const [nodePath, appPath, firstNum, secondNum, operationType] =
      process.argv;

    const operation = getOperationExecutor(operationType);

    const result = operation(parseInt(firstNum), parseInt(secondNum));

    if (typeof result === "number" && !isNaN(result)) {
      return console.log(`Результат: ${result}`);
    }

    throw "Неверные параметры";
  } catch (error) {
    console.error(error);
  }
};
