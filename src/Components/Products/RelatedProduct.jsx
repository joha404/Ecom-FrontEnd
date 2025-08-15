import React, { useEffect, useState } from "react";
import { getProductByCategoryId } from "../../api/product/product";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCartThunk } from "../../api/product/cart";

export default function RelatedProduct({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({}); // Track loading per product
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || userInfo?.id;

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductByCategoryId(categoryId);
        setProducts(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [product._id]: true }));
    try {
      await dispatch(
        addToCartThunk({
          userId,
          productId: product._id,
          quantity: 1,
        })
      );

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  const isProductInCart = (productId) =>
    cartItems.some((item) => item.productId === productId);

  if (!categoryId) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No related products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const discountPercentage = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )
              : 0;

            const productImage =
              product.images?.[0] ||
              "https://via.placeholder.com/300x240?text=No+Image";

            const rating = product.rating ?? 5.0;

            const inCart = isProductInCart(product._id);
            const isLoading = addingToCart[product._id];

            return (
              <div
                key={product._id}
                className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <a
                  href={`/productDetails/${product._id}`}
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                >
                  <img
                    className="object-cover w-full"
                    src={productImage}
                    alt={product.name}
                    loading="lazy"
                  />
                  {discountPercentage > 0 && (
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </a>
                <div className="mt-4 px-5 pb-5">
                  <a href={`/productDetails/${product._id}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-sm text-slate-900 line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={isLoading || inCart}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {inCart ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Added to Cart
                      </>
                    ) : isLoading ? (
                      <p>Adding...</p>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293
                              c-.63.63-.184 1.707.707 1.707H17m0 0
                              a2 2 0 100 4 2 2 0 000-4zm-8 2
                              a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
