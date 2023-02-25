module.exports = function (data) {
  let amount = 0;

  data.forEach((element) => {
    if (element % 3 === 0) {
      amount++;
    }
  });

  return amount;
};
