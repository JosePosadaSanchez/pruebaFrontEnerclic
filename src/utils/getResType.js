export const getResType = (data) => {
  if (data.included[0].attributes.content) {
    let objectType = 1;
    return objectType;
  } else if (data.included[0].attributes.values) {
    let objectType = 2;
    return objectType;
  } else {
    let objectType = 0;
    return objectType;
  }
};
