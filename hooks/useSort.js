import { priceAsc, priceDesc } from "../lib/sortFunction";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const useSort = (defaultProducts) => {
  const [sortedProducts, setSortedProducts] = useState(defaultProducts);
  const router = useRouter();
  const { sort } = router.query;

  useEffect(() => {
    if (sort) {
      console.log(sort);
      if (sort === "newest") {
      } else if (sort === "priceDesc") {
        const products = sortedProducts.sort(priceDesc);
        setSortedProducts(products);
      } else if (sort === "priceAsc") {
        const products = sortedProducts.sort(priceAsc);
        setSortedProducts(products);
      } else {
        setSortedProducts(defaultProducts);
      }
    }
  }, [sort]);
  return { sortedProducts };
};

export default useSort;
