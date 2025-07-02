import Loading from "../../Components/Loading/Loading";
import { getAllCategories } from "../../api/category/category";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategoryData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    setIsLoading(true);
    allCategories();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div></div>
      <div className="px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto mt-32">
        <div className="grid mt-8 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {categoryData.map((category) => (
            <div
              key={category._id}
              className="bg-gray-200 rounded-3xl shadow-lg p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={category.image}
                className="w-full rounded-3xl mb-3 object-cover"
                alt={category.name}
              />
              <h4 className="text-center text-lg font-semibold text-gray-700">
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
