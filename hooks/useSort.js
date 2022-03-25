import { priceAsc, priceDesc, newest } from "../lib/sortFunction";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const useSort = (defaultProducts) => {
  const [sortedProducts, setSortedProducts] = useState(defaultProducts);
  const router = useRouter();
  const { sort } = router.query;

  useEffect(() => {
    if (sort) {
      if (sort === "newest") {
        const products = sortedProducts.flat().sort(newest);
        setSortedProducts(products);
      } else if (sort === "priceDesc") {
        const products = sortedProducts.flat().sort(priceDesc);
        setSortedProducts(products);
      } else if (sort === "priceAsc") {
        const products = sortedProducts.flat().sort(priceAsc);
        setSortedProducts(products);
      } else {
        setSortedProducts(defaultProducts);
      }
    }
  }, [sort]);
  return { sortedProducts };
};

export default useSort;
