export const dropSeconds = (pDate) => {
  if (!pDate.toString().includes(":") && !pDate.toString().includes(" "))
    return pDate;
  const dateSplited = pDate.split(" ");
  const minutesSplited = dateSplited[1].split(":");
  return `${dateSplited[0]} ${minutesSplited[0]}:${minutesSplited[1]}`;
};
