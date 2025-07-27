import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import RecentProducts from "../../Components/RecentProducts/RecentProducts";

export default function Home() {
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
