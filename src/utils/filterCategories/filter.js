export const filter = (initialValue, value) => {
  let filterWidget = [];
  if (value === "balance") {
    filterWidget = initialValue[0].widge;
  }

  return filterWidget;
};
