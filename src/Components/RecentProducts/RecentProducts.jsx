import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../CustomHooks/useProducts";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export default function RecentProducts() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1 className="mt-12 mb-4">All Recent Products</h1>

      <motion.div
        className="grid mt-8 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.slice(0, 8).map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            className="mx-4"
          >
            <div className="rounded-lg bg-white dark:bg-gray-800 border my-4 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <ProductItem product={product} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
