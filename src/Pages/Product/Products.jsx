import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import FilterSidebar from "../../Components/common/FilterSidebar";
import SearchBar from "../../Components/common/SearchBar";
import ProductItem from "../../Components/ProductItem/ProductItem";
import useProducts from "../../CustomHooks/useProducts";
import Loading from "../../Components/Loading/Loading";
import { motion } from "framer-motion";

export default function Products() {
  const { data = [], isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const result = data.filter((product) => {
      const title = (product.title ?? "").toLowerCase();
      const priceNum = Number(product.price);

      const nameMatch = title.includes(searchQuery.toLowerCase());
      const priceMatch =
        !isNaN(priceNum) &&
        priceNum >= priceRange[0] &&
        priceNum <= priceRange[1];

      return nameMatch && priceMatch;
    });
    setFilteredProducts(result);
  }, [data, searchQuery, priceRange]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto mt-32">
        {/* Search + Filter row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
        >
          {/* Search Bar (LEFT) */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/5"
          >
            <SearchBar
              customWidth="w-[300px] sm:w-[300px]"
              query={searchQuery}
              setQuery={setSearchQuery}
            />
          </motion.div>

          {/* Filter Sidebar (RIGHT, smaller width) */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/5"
          >
            <div className="bg-white shadow-md rounded-lg p-4 border">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Filter by Price
              </h2>

              <select
                className="w-full p-2 border rounded"
                value={priceRange.join("-")}
                onChange={(e) => {
                  const val = e.target.value;
                  switch (val) {
                    case "0-100000":
                      setPriceRange([0, 100000]);
                      break;
                    case "0-50":
                      setPriceRange([0, 50]);
                      break;
                    case "50-100":
                      setPriceRange([50, 100]);
                      break;
                    case "100-500":
                      setPriceRange([100, 500]);
                      break;
                    case "500-1000":
                      setPriceRange([500, 1000]);
                      break;
                    case "1000-100000":
                      setPriceRange([1000, 100000]);
                      break;
                    default:
                      setPriceRange([0, 100000]);
                  }
                }}
              >
                <option value="0-100000">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-100000">Above $1000</option>
              </select>
            </div>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.length ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductItem product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center col-span-full text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No products found.
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}
