import Slider from "react-slick";
import { Hearts } from "react-loader-spinner";
import useCategories from "../../CustomHooks/useCategories";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { getAllCategories } from "../../api/category/category";

export default function CategorySlider() {
  // const { data, isLoading } = useCategories();
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = async () => {
    try {
      const res = await getAllCategories();
      console.log(res);
      setCategoryData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    setIsLoading(true);
    allCategories();
    setIsLoading(false);
  }, []);
  // if (isLoading) {
  //   return <Loading />;
  // }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-7">
        <Hearts height="80" width="80" color="#4fa94d" visible={true} />
      </div>
    );
  }

  return (
    <div className="my-12 px-2 mb-20">
      <h1 className=" font-bold my-6 dark:text-white text-gray-800 ">
        Browse Categories
      </h1>

      <Slider {...settings} className="mt-4 mb-6">
        {categoryData?.map((category) => (
          <div key={category._id} className="px-2 mb-6 cursor-pointer">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-[260px] flex flex-col justify-between">
              <div className="h-[180px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center py-3">
                <h3 className="text-md font-semibold dark:text-white text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
