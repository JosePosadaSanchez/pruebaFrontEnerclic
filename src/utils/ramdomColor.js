function ramdomNum(a, b) {
  return Math.round(Math.random() * (b - a) + parseInt(a));
}

export function ramdomColor() {
  let a = ramdomNum(0, 255);
  let b = ramdomNum(0, 255);
  let c = ramdomNum(0, 255);
  return `rgba(${a}, ${b}, ${c}, 0.5)`;
}
