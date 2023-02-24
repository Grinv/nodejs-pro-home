const { eventEmitter } = require("../eventEmitter");

eventEmitter.addListener("add", (firstNumber, secondNumber) =>
  eventEmitter.emit("result", firstNumber + secondNumber)
);
