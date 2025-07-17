import { Helmet } from "react-helmet";
import { useContext, useEffect } from "react";
import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import RecentProducts from "../../Components/RecentProducts/RecentProducts";
// import { CartContext } from "../../Context/CartContext";
// import { WishlistContext } from "../../Context/WishlistContext";

export default function Home() {
  // const { getLogged } = useContext(WishlistContext);
  // useEffect(() => {
  //   getLogged();
  // }, []);
  return (
    <>
      <div></div>
      <MainSlider />
      <div className="px-6 mx-auto  max-w-screen-xl">
        <CategorySlider />
        <RecentProducts />
      </div>
    </>
  );
}
