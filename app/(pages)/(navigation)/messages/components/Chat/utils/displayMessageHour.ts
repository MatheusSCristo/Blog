const displayMessageHour = (time: string) => {
  const date = new Date(time);
  if (date.getMinutes() < 10) {
    return `${date.getHours()}:0${date.getMinutes()}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
};

export default displayMessageHour;
