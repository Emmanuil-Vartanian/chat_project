const dateForImageName = () => {
  const hoursNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();
  const secondsNow = new Date().getSeconds();

  const dateNow = new Date().getDate();
  const monthNow = new Date().getMonth() + 1;
  const fullYearNow = new Date().getFullYear();

  return `${dateNow}.${monthNow}.${fullYearNow}-${hoursNow}.${minutesNow}.${secondsNow}`
};

module.exports.dateForImageName = dateForImageName()