import React, { useState, useEffect } from "react";
import AddressCard from "../../Components/address/AddressCard";
import { getAddress } from "../../api/user/address";
import OrderSummary from "../../Components/Checkout/OrderSummary";
import { getAllCart } from "../../api/product/cart";

export default function CheckOut() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(null);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const userProfileId = userInfo?.id;

  // 🟢 Fetch user addresses
  const fetchAddress = async () => {
    try {
      const res = await getAddress(userProfileId);
      setAddresses(res || []);
      setSelectedAddressId(res?.[0]?._id || null);
    } catch (error) {
      console.error("❌ Failed to fetch addresses:", error);
    }
  };

  // 🟢 Fetch cart data
  const fetchCart = async () => {
    try {
      const res = await getAllCart(userProfileId);
      console.log(res);
      setTotalPrice(res.totalPrice);
      setCartDetails(res.items || []);
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAddress(), fetchCart()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const selectedAddress = addresses.find(
    (addr) => addr._id === selectedAddressId
  );

  const subtotal = cartDetails.totalPrice;

  if (loading)
    return <div className="text-center mt-10">Loading checkout data...</div>;

  return (
    <div className="bg-white sm:px-8 px-4 py-6 mt-32">
      <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl text-slate-900 font-semibold mb-6">
              Select a Delivery Address
            </h2>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr._id}
                  addr={addr}
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                />
              ))}
            </div>
            {selectedAddressId && (
              <p className="mt-6 text-sm text-green-600">
                Selected Address ID: <strong>{selectedAddressId}</strong>
              </p>
            )}
          </div>

          <div className="relative">
            <OrderSummary
              subtotal={totalPrice}
              discount={0}
              shipping={6}
              tax={5}
              address={selectedAddress}
              userInfo={userInfo}
              cartDetails={cartDetails}
              onPurchase={() => {
                console.log("🧾 Purchase Data:");
                console.log("✅ User Info:", userInfo);
                console.log("✅ Selected Address:", selectedAddress);
                console.log("✅ Cart Details:", cartDetails);
                console.log("✅ Subtotal:", subtotal);
                console.log("✅ Total:", subtotal + 6 + 5);
              }}
              onContinue={() => {
                console.log("🛍️ Continue shopping clicked");
                // You can use a navigate('/shop') or similar here
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
