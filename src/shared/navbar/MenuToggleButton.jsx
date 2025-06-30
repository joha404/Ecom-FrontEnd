import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export default function MenuToggleButton({ isMenuOpen, setIsMenuOpen }) {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      className="lg:hidden z-50 text-3xl text-gray-700 dark:text-white ml-4"
      type="button"
    >
      {isMenuOpen ? <RxCross1 /> : <CiMenuBurger />}
    </button>
  );
}
