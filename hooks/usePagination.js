import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { priceAsc, priceDesc, newest } from "../lib/sortFunction";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const usePagination = (initialValue, category) => {
  const router = useRouter();
  const { sort, page, limit } = router.query;
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/product?page=${pageIndex + 1}&category=${category}&limit=8`; // SWR key
  };
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    { fallbackData: initialValue, revalidateAll: true }
  );
  console.log("render usePagination");
  useEffect(() => {
    if (+page) {
      setSize(+page);
    }
  }, [+page]);

  const isLoadingInitialData =
    (!data && !error) ||
    (+page && +page > 1 && !data.flat()[+page * +limit - 1]);
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  //sort

  if (sort === "newest") {
    data = data.flat().sort(newest);
  } else if (sort === "priceDesc") {
    data = data.flat().sort(priceDesc);
  } else if (sort === "priceAsc") {
    data = data.flat().sort(priceAsc);
  }

  //
  const products = data.flat().map((item) => {
    return {
      id: item._id.toString(),
      productPrice: item?.productPrice,
      productDescription: item?.productDescription,
      category: item?.category,
      picUrl: item?.picUrl,
      productTitle: item?.productTitle,
      productSubTitle: item?.productSubTitle,
      subCategory: item?.subCategory,
      color: item?.color,
      size: item?.size,
      productDate: item?.productDate,
    };
  });

  return {
    products,
    size,
    setSize,
    isLoadingMore,
  };
};
export default usePagination;
