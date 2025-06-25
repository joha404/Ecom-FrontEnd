import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../CustomHooks/useProducts";
import { Helmet } from "react-helmet";

export default function RecentProducts() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Products</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="grid mt-8 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
