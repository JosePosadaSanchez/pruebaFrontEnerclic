export const getMonth = (d) => {
  //   console.log(d);
  let mouth = d.split("-")[1];
  let year = d.split("-")[0];
  let string = "";
  switch (mouth) {
    case "01":
      string = `Enero ${year}`;
      break;
    case "02":
      string = `Febrero ${year}`;
      break;
    case "03":
      string = `Marzo ${year}`;
      break;
    case "04":
      string = `Abril ${year}`;
      break;
    case "05":
      string = `Mayo ${year}`;
      break;
    case "06":
      string = `Junio ${year}`;
      break;
    case "07":
      string = `Julio ${year}`;
      break;
    case "08":
      string = `Agosto ${year}`;
      break;
    case "09":
      string = `Septiembre ${year}`;
      break;
    case "10":
      string = `Octubre ${year}`;
      break;
    case "11":
      string = `Noviembre ${year}`;
      break;
    case "12":
      string = `Diciembre ${year}`;
      break;
  }
  //   console.log(string);
  return string;
};

export const getYear = (d) => {
  return d.split("-")[0];
};
export const getDay = (d) => {
  return d.split("T")[0];
};
