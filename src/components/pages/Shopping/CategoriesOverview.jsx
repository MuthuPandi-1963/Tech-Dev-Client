import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import GetCategoryProductsThunk from "../../../store/Thunks/Products/GetCategoryProductsThunk";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Link } from "react-router-dom";
import ProductsLayout from "../../layouts/ProductsLayout";
const CategoriesOverview = () => {
  // Get categoryId from URL
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      // Fetch the details of the category using the categoryId
      try {
        const response = await dispatch(
          GetCategoryProductsThunk(categoryId.split("_")[0])
        );
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
          <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">
            Shop By Product
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <ProductsLayout key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
export default CategoriesOverview;
