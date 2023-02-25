const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

function initErrorObserver() {
  eventEmitter.on("error", (error) => console.log(`Ошибка: ${error}`));
}

function dispatchError(message) {
  eventEmitter.emit("error", new Error(message));
}

module.exports = { eventEmitter, initErrorObserver, dispatchError };
