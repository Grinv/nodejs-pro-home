const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

function initResultsObserver() {
  eventEmitter.on("result", (result) => console.log(result));
}

function dispatchResult(result) {
  eventEmitter.emit("result", `Результат: ${result}`);
}

module.exports = {
  initResultsObserver,
  dispatchResult,
};
