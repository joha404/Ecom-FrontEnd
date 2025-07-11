import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import { getAllProduct } from "../../api/product/product";

export default function RecentProducts() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getAllProduct();
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []); // dependency array included

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Recent Products</title>
      </Helmet>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-12 mb-4 text-center">
        All Recent Products
      </h1>

      <div className="grid mt-8 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.slice(0, 8)?.map((product) => (
          <div
            key={product._id}
            className="mx-4 rounded-lg bg-white dark:bg-gray-800 border my-4 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
