import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";

// Dummy data (replace with API call)
const DUMMY_PRODUCTS = [
  { id: 1, name: "iPhone 14", price: 999 },
  { id: 2, name: "Samsung Galaxy S23", price: 899 },
  { id: 3, name: "OnePlus 11", price: 799 },
  { id: 4, name: "Redmi Note 12", price: 299 },
];

export default function ProductSearchWithFilter() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState(DUMMY_PRODUCTS);

  useEffect(() => {
    const result = DUMMY_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(result);
  }, [query, priceRange]);

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/4">
        <FilterSidebar priceRange={priceRange} setPriceRange={setPriceRange} />
      </div>
      <div className="w-3/4">
        <SearchBar query={query} setQuery={setQuery} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
