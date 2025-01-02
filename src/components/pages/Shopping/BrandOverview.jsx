import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GetBrandProductsThunk from "../../../store/Thunks/Products/GetBrandProducts";
import Breadcrumb from "../../../helpers/Breadcrumb";
import ProductsLayout from "../../layouts/ProductsLayout";
import CategorySkeleton from "../../../helpers/skeleton/CategorieSkeleton";
import { productStore } from "../../../store/Context/StateCall";

const BrandOverview = () => {
  // Get categoryId from URL
  const { brandId } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const {data , isLoading} = useSelector(productStore)
  useEffect(() => {
    const fetchBrandDetails = async () => {
      // Fetch the details of the category using the categoryId
      try {
        const response = await dispatch(
          GetBrandProductsThunk(brandId.split("_")[0])
        );
        console.log(response);

        setBrandDetails(response.payload.data);
      } catch (error) {
        console.error("Failed to fetch brand details", error);
      }
    };

    fetchBrandDetails();
  }, [brandId]); // Refetch when brandId changes

  if (!brandDetails || isLoading) {
    return <CategorySkeleton loading={true}/>;
  }
  console.log(location.pathname.split("/"));

  return (
    <>
      {/* <Breadcrumb apiData={brandItems} params={{ brandId: location.pathname.split('/').pop() }} /> */}
      <div className="w-full lg:w-[95%] mx-auto my-6">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">
            Shop By Product
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {brandDetails.map((product) => (
            <ProductsLayout key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandOverview;
