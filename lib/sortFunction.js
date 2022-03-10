export function priceAsc(a, b) {
  if (+a.product_price < +b.product_price) {
    return -1;
  }
  if (+a.product_price > +b.product_price) {
    return 1;
  }
  return 0;
}
export function priceDesc(a, b) {
  if (+a.product_price > +b.product_price) {
    return -1;
  }
  if (+a.product_price < +b.product_price) {
    return 1;
  }
  return 0;
}
