const {
  eventEmitter,
  initErrorObserver,
  dispatchError,
} = require("./eventEmitter");
require(`./operations/add`);
require(`./operations/multiply`);

function calcResultHandler(result) {
  if (typeof result === "number" && !isNaN(result)) {
    eventEmitter.removeAllListeners();
    return console.log(`Результат: ${result}`);
  }

  dispatchError("Неверные параметры");
}

function calc() {
  initErrorObserver();

  if (process.argv.length < 5) {
    return dispatchError("Недостаточно аргументов");
  }

  const [nodePath, appPath, firstNum, secondNum, operationType] = process.argv;

  if (eventEmitter.listenerCount(operationType) === 0) {
    return dispatchError(`Операции ${operationType} не существует`);
  }

  eventEmitter.once("result", calcResultHandler);
  eventEmitter.emit(operationType, parseInt(firstNum), parseInt(secondNum));
}

module.exports = calc;
