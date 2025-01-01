import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom"; 
import GetCategoryProductsThunk from "../../../store/Thunks/Products/GetCategoryProductsThunk";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {Link} from 'react-router-dom'
const CategoriesOverview = () => {
  // Get categoryId from URL
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      // Fetch the details of the category using the categoryId
      try {
        const response = await dispatch(GetCategoryProductsThunk(categoryId.split("_")[0]))
        console.log(response);
        
        setCategoryDetails(response.payload.data);
      } catch (error) {
        console.error("Failed to fetch category details", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]); // Refetch when categoryId changes

  if (!categoryDetails) {
    return <div>Loading category details...</div>;
  }

  return (
    <>
    <div className="w-full lg:w-[95%] mx-auto my-6">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">Shop By Product</h1>
      </div>
      <div className="sm:grid max-sm:mx-10  max-sm:flex max-sm:flex-wrap   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
        {categoryDetails.map((product) => (
          <Link 
          to={`/shopping/products/${product._id}`}
            key={product._id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden group cursor-pointer"
            >
            {/* Trending Label */}
            {product.trending && (
              <div className="absolute flex items-center gap-x-1 bottom-28 z-40 -left-1 bg-black text-yellow-500 px-4 py-1 rounded-tr-md text-xs font-bold">
                <WhatshotIcon sx={{ fontSize: '14px', color: 'red' }} />
                <p>Top Selling</p>
              </div>
            )}

            {/* Image Section */}
            <div className="relative w-full">
              <img
                src={product.productImg || 'https://via.placeholder.com/150'}
                alt={product.productName}
                className="w-full h-64 object-cover max-sm:w-96"  // Consistent image height across all layouts
                />
              {product.offer && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full px-3 py-1 text-xs">
                  {product.offer}% Off
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="my-1 font-bold">{product.productName}</h2>
                  <p className="text-xs text-gray-500 overflow-hidden">{product.description.slice(0, 60)}.....</p>
                </div>
                <div className="text-right grid">
                  <span className="text-lg font-bold text-green-600">
                    ₹{product.sellingPrice}
                  </span>
                  <span className="text-sm line-through text-red-400 font-semibold ml-2">
                    ₹{product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
        </>
  );

};
export default CategoriesOverview;



  
