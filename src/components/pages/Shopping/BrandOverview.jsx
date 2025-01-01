import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom"; 
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GetBrandProductsThunk from "../../../store/Thunks/Products/GetBrandProducts";
import Breadcrumb from "../../../helpers/Breadcrumb";
import ProductsLayout from "../../layouts/ProductsLayout";

const BrandOverview = () => {
  // Get categoryId from URL
  const {  brandId } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    const fetchBrandDetails = async () => {
      // Fetch the details of the category using the categoryId
      try {
        const response = await dispatch(GetBrandProductsThunk(brandId.split("_")[0]))
        console.log(response);
        
        setBrandDetails(response.payload.data);
      } catch (error) {
        console.error("Failed to fetch brand details", error);
      }
    };

    fetchBrandDetails();
  }, [brandId]); // Refetch when brandId changes

  if (!brandDetails) {
    return <div>Loading brand details...</div>;
  }
  console.log(location.pathname.split('/'));
  
  return (
    <>
    {/* <Breadcrumb apiData={brandItems} params={{ brandId: location.pathname.split('/').pop() }} /> */}
    <div className="w-full lg:w-[95%] mx-auto my-6">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">Shop By Product</h1>
      </div>
      <div className="sm:grid max-sm:mx-10  max-sm:flex max-sm:flex-wrap   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
        {brandDetails.map((product) => (
          <ProductsLayout product={product}/>
        ))}
      </div>
    </div>
</>
  );
};

export default BrandOverview;



  
