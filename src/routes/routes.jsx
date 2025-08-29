import { useRoutes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Products from "../Pages/Product/Products";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "../Pages/Product/ProductDetails";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import Wishlist from "../Pages/Wishlist/Wishlist";
import CheckOut from "../Pages/CheckOut/CheckOut";
import AllOrders from "../Pages/AllOrders/AllOrders";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import ResetCode from "../Pages/Auth/ResetCode";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Categories from "../Pages/Category/Categories";
import Profile from "../Pages/Profile/Profile";
import Setting from "../Pages/Setting/Setting";
import OTPVerification from "../Pages/Auth/OTPVerification";
import ForgetPasswordResetCode from "../Pages/Auth/ForgetPassword";
import Payment from "../Pages/Payment/Payment";

export default function AppRoutes() {
  return useRoutes([
    // Public/auth routes
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "forget", element: <ForgetPasswordResetCode /> },
    { path: "email-verification", element: <ResetCode /> },
    { path: "resetpassword", element: <ResetPassword /> },
    { path: "otp-verification", element: <OTPVerification /> },

    // Protected routes with Layout wrapper
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        // ✅ Corrected payment-success route
        {
          path: "api/payment-success/:id",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
}
