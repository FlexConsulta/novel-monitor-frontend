import { dropSeconds } from "./dateTimeFormat";

export const compareDate = (date1, date2) => {
  const tolerance = 3;
  const minutesDate1 = dropSeconds(date1).split(":")[1];
  const minutesDate2 = dropSeconds(date2).split(":")[1];
  if (date1.split(" ")[0] != date2.split(" ")[0]) return false;
  if (Number(minutesDate1) > Number(minutesDate2) + tolerance) return false;
  if (Number(minutesDate1) < Number(minutesDate2) - tolerance) return false;
  return true;
};
