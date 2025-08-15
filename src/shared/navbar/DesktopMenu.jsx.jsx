import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import ToggleMode from "./ToggleMode";
import UserProfileDropdown from "../../Components/Navbar/UserProfileDropdown";
import { useSelector } from "react-redux";

export default function DesktopMenu({ token, wishlistCount }) {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartCount = cartItems?.items?.length || 0; // array length

  return (
    <div className="hidden lg:flex lg:w-auto items-center gap-6">
      {["/", "/products", "/categories"].map((path, idx) => (
        <NavLink
          key={idx}
          to={path}
          className={({ isActive }) =>
            `nav-link capitalize ${
              isActive
                ? "text-green-600 font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:text-green-600"
            } transition`
          }
        >
          {path === "/" ? "Home" : path.slice(1)}
        </NavLink>
      ))}

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `relative nav-link flex items-center ${
            isActive
              ? "text-green-600 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-green-600"
          } transition`
        }
      >
        <LuShoppingCart className="text-2xl" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
            {cartCount}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `relative nav-link ${
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-red-600"
          } transition`
        }
      >
        <FaRegHeart className="text-2xl" />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {wishlistCount}
          </span>
        )}
      </NavLink>

      {token ? (
        <UserProfileDropdown />
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `relative nav-link ${
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-green-600"
              } transition`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `relative nav-link ${
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-green-600"
              } transition`
            }
          >
            Register
          </NavLink>
        </>
      )}
    </div>
  );
}
