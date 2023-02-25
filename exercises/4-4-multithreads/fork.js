const calc = require("./calc");

process.on("message", (data) => {
  process.send(calc(data));
  process.disconnect();
});
