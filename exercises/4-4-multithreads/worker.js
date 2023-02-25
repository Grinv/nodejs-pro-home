const { parentPort, workerData } = require("worker_threads");
const calc = require("./calc");

function compute({ data }) {
  return calc(data);
}

parentPort.postMessage(compute(workerData));
