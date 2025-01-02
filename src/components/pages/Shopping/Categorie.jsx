import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GetCategoryThunk from "../../../store/Thunks/Products/GetCategoryThunk";
import { Link } from "react-router-dom";
import LazyImage from "../../../helpers/LazyImages";
import Skeleton from "../../../helpers/skeleton/CategorySkeleton";
import SkeletonFlex from "../../../helpers/skeleton/CategorySkeleton";

const Categorie = ({ BtnStyle, imageStyle }) => {
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true before fetching
      const categories = await dispatch(GetCategoryThunk());
      setCategoryItems(categories.payload); // Assuming GetCategoryThunk resolves with category data.
      setLoading(false); // Set loading to false after fetching
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <>
      <div className="w-[95%] mx-auto my-4 lg:mb-10">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold my-4">
            Shop By Category
          </h1>
        </div>

        {loading ? ( // Show loading indicator if loading is true
          <SkeletonFlex loading={true} />
        ) : (
          <div className={BtnStyle}>
            {categoryItems.map((category, index) => (
              <Link
                to={`/shopping/category/${category._id}_${category.categoryName}`}
                key={index}
                className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg ${imageStyle}`}
              >
                <div className="w-full h-64 sm:h-68 lg:h-80 relative">
                  <LazyImage
                    src={category.categoryImg}
                    alt={category.categoryName}
                    className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 ${imageStyle}`}
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-center text-white px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {category.categoryName}
                    </h2>
                    <p className="text-xs sm:text-sm">
                      {category.categoryDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Categorie;
