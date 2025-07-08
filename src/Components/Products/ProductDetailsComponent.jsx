import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import { getSingleProduct } from "../../api/product/product";
import RelatedProduct from "./RelatedProduct";

export default function ProductDetailsComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const fetchProductDetails = async (id) => {
    try {
      setLoading(true);
      const res = await getSingleProduct(id);
      const fetchedProduct = res.data?.product;
      const catId = fetchedProduct.category?._id;
      if (catId === null) {
        setCategoryId("");
      }
      setCategoryId(catId);
      setProduct(fetchedProduct);
      setMainImage(fetchedProduct?.images?.[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (loading || !product) return <Loading />;

  // Normalize features to array
  const featuresArray = Array.isArray(product.features)
    ? product.features
    : typeof product.features === "string"
    ? product.features.split(",").map((f) => f.trim())
    : [];

  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <div className="flex flex-wrap -mx-4">
          {/* Left - Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt={product?.name}
              className="w-full h-96 rounded-lg shadow-md mb-4 object-cover"
            />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images?.map((thumb, i) => (
                <img
                  key={i}
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer transition duration-300 ${
                    mainImage === thumb
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
            <p className="text-gray-600 mb-4">SKU: {product?._id}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
                      5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 
                      1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 
                      7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527
                      c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>

            <p className="text-gray-700 mb-6">{product?.description}</p>

            {/* Quantity */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity:
              </label>
              <div className="flex items-center rounded-full overflow-hidden border border-gray-300 w-max bg-white shadow-sm">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-10 text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-12 text-center text-base font-medium text-gray-700 focus:outline-none focus:ring-0 border-0 bg-white"
                />
                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-6">
              <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75
                      m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 
                      0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 
                      0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 
                      0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>

              <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                      0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                      3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                      12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlist
              </button>
            </div>

            {/* Features */}
            {featuresArray.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {featuresArray.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedProduct categoryId={categoryId} />

      {/* Recently Viewed or Related Products */}
      <RecentProducts />
    </div>
  );
}
