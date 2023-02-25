const { Worker } = require("worker_threads");

module.exports = async function (data) {
  return new Promise(function (resolve, reject) {
    const worker = new Worker(`${__dirname}/worker.js`, {
      workerData: {
        data,
      },
    });

    worker.on("message", (result) => resolve(result));

    worker.on("error", (error) => reject(error));
  });
};
