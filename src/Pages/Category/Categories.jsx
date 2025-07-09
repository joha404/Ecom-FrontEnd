import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { getAllCategories } from "../../api/category/category";

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await getAllCategories();
        setCategoryData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-2 px-4 mt-24 sm:px-6  mx-auto max-w-screen-xl  2xl:px-0">
      <h2 className="text-2xl font-bold text-slate-900 mb-10">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="bg-gray-50 p-3 rounded-lg my-3 border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative"
          >
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <img
                src={category.image}
                alt={category.name || "Category"}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                {category.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
