export function priceAsc(a, b) {
  if (+a.productPrice < +b.productPrice) {
    return -1;
  }
  if (+a.productPrice > +b.productPrice) {
    return 1;
  }
  return 0;
}
export function priceDesc(a, b) {
  if (+a.productPrice > +b.productPrice) {
    return -1;
  }
  if (+a.productPrice < +b.productPrice) {
    return 1;
  }
  return 0;
}
export function newest(a, b) {
  if (+new Date(a.productDate) < +new Date(b.productDate)) {
    return -1;
  }
  if (+new Date(a.productDate) > +new Date(b.productDate)) {
    return 1;
  }
  return 0;
}
export const sortList = (sort, defaultProducts) => {
  let sortedProducts;

  if (sort === "newest") {
    sortedProducts = defaultProducts.flat().sort(newest);
  } else if (sort === "priceDesc") {
    sortedProducts = defaultProducts.flat().sort(priceDesc);
  } else if (sort === "priceAsc") {
    sortedProducts = defaultProducts.flat().sort(priceAsc);
  } else {
    sortedProducts = defaultProducts;
  }

  return { sortedProducts };
};
