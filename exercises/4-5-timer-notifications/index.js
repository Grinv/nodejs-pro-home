const notifier = require("node-notifier");
const path = require("path");

const timeRegEx = /^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?$/;

const secondsMultiplier = 1000;
const minutesMultiplier = secondsMultiplier * 60;
const hoursMultiplier = minutesMultiplier * 60;

const notifierConfig = {
  title: "Твой любимый будильник",
  message: "Алло, гараж! Подъём!".toUpperCase(),
  sound: true,
  contentImage: path.join(__dirname, "alarm.jpg"),
  icon: path.join(__dirname, "alarm.jpg"),
};

/**
 * @param {string} time - time in format '{number}h{number}m{number}s'. All params are not required.
 *
 * @example
 *  10h5m1s, 10h5m, 1s
 */

module.exports = function () {
  const time = process.argv[2];

  if (!time || typeof time !== "string") {
    return console.error("Время не передано");
  }

  const timeData = time.match(timeRegEx);
  if (timeData === null) {
    return console.error("Неправильный формат");
  }

  const [_, hours = 0, minutes = 0, seconds = 0] = timeData;

  const timer =
    Number(hours) * hoursMultiplier +
    Number(minutes) * minutesMultiplier +
    Number(seconds) * secondsMultiplier;

  setTimeout(() => notifier.notify(notifierConfig), timer);
};
