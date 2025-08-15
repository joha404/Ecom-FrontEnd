import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Hearts } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/category/category";

export default function CategorySlider() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCategories();
      setCategoryData(res?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: categoryData.length > 6,
    speed: 300,
    slidesToShow: 6, // always 6 on large screens
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-7">
        <Hearts height="80" width="80" color="#4fa94d" visible={true} />
      </div>
    );
  }

  if (!categoryData.length) {
    return (
      <p className="text-center my-7 dark:text-white">No categories found.</p>
    );
  }

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16 mb-20">
      <h1 className="font-bold my-6 dark:text-white text-gray-800">
        Browse Categories
      </h1>

      <Slider {...settings} className="mt-4 mb-6 my-10">
        {categoryData.map((category) => (
          <div key={category._id} className="px-2 cursor-pointer">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-[180px]">
              <div className="h-[120px] overflow-hidden">
                <img
                  src={category.image || "/placeholder.png"}
                  alt={category.name || "Category"}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center py-2">
                <h3 className="text-sm sm:text-md font-semibold dark:text-white text-gray-800 truncate">
                  {category.name || "Unnamed Category"}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
