const date = (date, forChatGroupsOrMessages) => {
  const hoursMess = new Date(+date).getHours();
  const minutesMess = new Date(+date).getMinutes();
  const dateMess = new Date(+date).getDate();

  const dateNow = new Date().getDate();
  const monthNow = new Date(+date).getMonth() + 1;
  const fullYearNow = new Date(+date).getFullYear();

  const dateDate = dateMess < 10 ? "0" + dateMess : dateMess;
  const dateMonth = monthNow < 10 ? "0" + monthNow : monthNow;
  const dateHours = hoursMess < 10 ? "0" + hoursMess : hoursMess;
  const dateMinutes = minutesMess < 10 ? "0" + minutesMess : minutesMess;

  if (forChatGroupsOrMessages === "forChatGroups") {
    if (dateNow - 1 === dateMess) return `Вчера`;
    else if (dateNow !== dateMess)
      return `${dateDate}/${dateMonth}/${fullYearNow}`;
    return `${dateHours}:${dateMinutes}`;
  } else {
    if (dateNow - 1 === dateMess) return `Вчера ${dateHours}:${dateMinutes}`;
    else if (dateNow !== dateMess)
      return `${dateDate}/${dateMonth}/${fullYearNow} ${dateHours}:${dateMinutes}`;
    return `${dateHours}:${dateMinutes}`;
  }
};

export default date;
