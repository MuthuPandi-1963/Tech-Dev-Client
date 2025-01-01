import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GetCategoryThunk from '../../../store/Thunks/Products/GetCategoryThunk';
import { Link, useLocation } from 'react-router-dom';

const Categorie = ({BtnStyle}) => {
  const [categoryItems, setCategoryItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await dispatch(GetCategoryThunk());
      setCategoryItems(categories.payload); // Assuming GetCategoryThunk resolves with category data.
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <>
    <div className="w-[95%] mx-auto my-6">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold mb-6">Shop By Category</h1>
      </div>
      <div className={BtnStyle}>
        {categoryItems.map((category, index) => (
          <Link 
          to={`/shopping/category/${category._id}_${category.categoryName}`}
          key={index}
          className="lg:w-64 w-48 relative category-card shadow-lg rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={category.categoryImg}
              alt={category.categoryName}
              className="lg:w-64 lg:h-80 w-48 h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold">{category.categoryName}</h2>
                <p className="text-sm">{category.categoryDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
        </>
  );
};

export default Categorie;
