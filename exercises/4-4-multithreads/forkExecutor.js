const { fork } = require("child_process");

module.exports = async function (data) {
  return new Promise(function (resolve, reject) {
    const forkProcess = fork(`${__dirname}/fork.js`);
    forkProcess.send(data);
    forkProcess.on("message", (result) => resolve(result));
    forkProcess.on("error", (err) => reject(err));
  });
};
