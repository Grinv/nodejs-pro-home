const { eventEmitter } = require("../eventEmitter");

eventEmitter.addListener("multiply", (firstNumber, secondNumber) => {
  eventEmitter.emit("result", firstNumber * secondNumber);
});
