export const compareDate = (date1, date2) => {
  const tolerance = 3;

  // console.log(date1, date2);

  if (!date1.toString().includes(":") || !date2.toString().includes(":"))
    return false;

  const dataConverted1 = new Date(
    date1.toString().split(" ")[0].split("/")[2],
    date1.toString().split(" ")[0].split("/")[1],
    date1.toString().split(" ")[0].split("/")[0],
    date1.toString().split(" ")[1].split(":")[0],
    date1.toString().split(" ")[1].split(":")[1],
    date1.toString().split(" ")[1].split(":")[2],
    0
  );
  const dataConverted2 = new Date(
    date2.toString().split(" ")[0].split("/")[2],
    date2.toString().split(" ")[0].split("/")[1],
    date2.toString().split(" ")[0].split("/")[0],
    date2.toString().split(" ")[1].split(":")[0],
    date2.toString().split(" ")[1].split(":")[1],
    date2.toString().split(" ")[1].split(":")[2],
    0
  );

  var diff =
    (new Date(dataConverted1).getTime() - new Date(dataConverted2).getTime()) /
    1000;

  diff /= 60;
  diff = Math.abs(Math.round(diff));

  return tolerance >= diff;
};
