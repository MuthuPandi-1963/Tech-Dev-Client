import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GetProductThunk from "../../../store/Thunks/Products/GetProductsThunk"; // Assuming this is the action to fetch products
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Link, useLocation } from "react-router-dom";
import ProductsLayout from "../../layouts/ProductsLayout";

const Products = ({ CategoryProducts }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await dispatch(GetProductThunk());
      setProducts(productData.payload); // Assuming GetProductsThunk resolves with product data
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <div className="w-full lg:w-[95%] mx-auto my-4">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">
            Shop By Product
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <ProductsLayout key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
