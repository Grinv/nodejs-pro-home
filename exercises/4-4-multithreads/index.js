const os = require("os");
const { PerformanceObserver } = require("perf_hooks");
const { initResultsObserver, dispatchResult } = require("./events");
const workerExecutor = require("./workerExecutor");
const forkExecutor = require("./forkExecutor");

const calc = require("./calc");

const ELEMENTS_COUNT = 60000001;

function initThreadPoolSize() {
  process.env.UV_THREADPOOL_SIZE = os.cpus().length;
}

function initPerfomananceOberver() {
  const perfomanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}`);
    });
  });
  perfomanceObserver.observe({ entryTypes: ["measure"] });
}

function calcWithoutWorker(data) {
  performance.mark("startWithoutWorker");

  dispatchResult(calc(data));

  performance.mark("endWithoutWorker");
  performance.measure(
    "timeWithoutWorker",
    "startWithoutWorker",
    "endWithoutWorker"
  );
}

async function calcWithWorker(data) {
  performance.mark("startWithWorker");

  const chunkSize = Math.floor(ELEMENTS_COUNT / process.env.UV_THREADPOOL_SIZE);
  const chunks = [];

  while (data.length > 0) {
    chunks.push(data.splice(0, chunkSize));
  }

  try {
    const result = await Promise.all(
      chunks.map((chunk) => workerExecutor(chunk))
    );

    dispatchResult(result.reduce((acc, chunk) => acc + chunk, 0));
  } catch (e) {
    console.error(e);
  }

  performance.mark("endWithWorker");
  performance.measure("timeWithWorker", "startWithWorker", "endWithWorker");
}

async function calcWithFork(data) {
  performance.mark("startWithFork");

  const chunkSize = Math.floor(ELEMENTS_COUNT / process.env.UV_THREADPOOL_SIZE);
  const chunks = [];

  while (data.length > 0) {
    chunks.push(data.splice(0, chunkSize));
  }

  try {
    const result = await Promise.all(
      chunks.map((chunk) => forkExecutor(chunk))
    );

    dispatchResult(result.reduce((acc, chunk) => acc + chunk, 0));
  } catch (e) {
    console.error(e);
  }

  performance.mark("endWithFork");
  performance.measure("timeWithFork", "startWithFork", "endWithFork");
}

module.exports = async function () {
  initPerfomananceOberver();
  initResultsObserver();
  initThreadPoolSize();

  const initData = new Array(ELEMENTS_COUNT).fill().map((_, i) => i + 1);

  calcWithoutWorker([...initData]);
  await calcWithWorker([...initData]);
  await calcWithFork([...initData]);
};
