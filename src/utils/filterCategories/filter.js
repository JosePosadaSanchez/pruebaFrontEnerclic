export const filter = (initialValue, value) => {
  let filterWidget = [];
  if (value === "balance") {
    filterWidget = initialValue[0].widge;
  }
  if (value === "demanda") {
    filterWidget = initialValue[1].widge;
  }
  if (value === "generacion") {
    filterWidget = initialValue[2].widge;
  }
  if (value === "intercambios") {
    filterWidget = initialValue[3].widge;
  }
  if (value === "transporte") {
    filterWidget = initialValue[4].widge;
  }
  if (value === "mercados") {
    filterWidget = initialValue[5].widge;
  }

  return filterWidget;
};
