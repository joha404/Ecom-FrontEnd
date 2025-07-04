import React, { useState, useEffect } from "react";
import AddressCard from "../../Components/address/AddressCard"; // Should support selection UI
import { getAddress } from "../../api/user/address";
import OrderSummary from "../../Components/Checkout/OrderSummary";

export default function CheckOut() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddress = async () => {
    const userDetails = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const userProfileId = userDetails?.id;

    try {
      const res = await getAddress(userProfileId);
      setAddresses(res || []);
      setSelectedAddressId(res?.[0]?._id || null);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading addresses...</div>;

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

            {/* Optional confirmation */}
            {selectedAddressId && (
              <p className="mt-6 text-sm text-green-600">
                Selected Address ID: <strong>{selectedAddressId}</strong>
              </p>
            )}
          </div>

          <div className="relative">
            <OrderSummary
              subtotal={72}
              discount={0}
              shipping={6}
              tax={5}
              onPurchase={() => {
                console.log("Purchase completed!");
                // Implement checkout logic
              }}
              onContinue={() => {
                console.log("Continue shopping clicked");
                // Redirect to shop page, etc.
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
