import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GetSingleProductThunk from "../../../store/Thunks/Products/ProductOverviewThunk";
import ProductsLayout from "../../layouts/ProductsLayout";
import {
  Whatshot as WhatshotIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import AddOrderThunk from "../../../store/Thunks/Orders/AddOrderThunk";
import { addToCartThunk } from "../../../store/Thunks/Carts/CartsThunk";
import { addToFavoriteThunk } from "../../../store/Thunks/Carts/FavoriteThunk";
import { AuthContext } from "../../../store/Context/AuthContext";
import { productStore } from "../../../store/Context/StateCall";
import Media from "../../../helpers/skeleton/ProductOverviewSkeleton";




const ProductOverview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const dispatch = useDispatch();
  const {user, isAuthenticated} = useSelector(state=>state.auth)
  const {authDispatch} = useContext(AuthContext)
  const {data , isLoading} = useSelector(productStore)
  console.log(isLoading,data);
  
  // Function to handle add to cart action
  const handleAddOrder = () => {
    if(!isAuthenticated){
      authDispatch({type :"login"})
      return;
    }

    const productToAdd = {
      userId : user.id,
      productId: product._id,
    };
    console.log(productToAdd);
    dispatch(addToCartThunk(productToAdd))
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await dispatch(GetSingleProductThunk(productId));
        const { product, relatedProducts } = response.payload;
        setProduct(product);
        setRelatedProduct(relatedProducts);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId, dispatch]);


  if (isLoading || !product) {
    return <Media loading={true} />;
  }
  async function handleAddFavorite(){
    if(!isAuthenticated){
      authDispatch({type :"login"})
      return;
    }
    try{
    const productToAdd = {
      userId : user.id,
      productId: product._id,
    };
    const response = await dispatch(addToFavoriteThunk(productToAdd))
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
  }
  return (
    <>
      {/* Product Details Section */}
      <div className="bg-white px-4 py-6 shadow-gray-600 rounded-lg shadow-md w-full mx-auto flex flex-col lg:flex-row lg:gap-x-8">
        {/* Left Section: Image */}
        <div className=" flex justify-center items-center max-w-full lg:max-w-[50%]">
          <div className="w-full aspect-square lg:aspect-auto rounded-lg overflow-hidden">
            <img
              src={product.productImg || "https://via.placeholder.com/400"}
              alt={product.productName}
              className="w-[500px] h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="flex-1 mt-6 lg:mt-0 relative">
          {product.trending && (
            <div className="absolute flex items-center gap-x-1 right-0 top-0 bg-black text-yellow-500 px-4 py-1 rounded-bl-md  font-semibold">
              <WhatshotIcon sx={{ fontSize: "20px", color: "red" }} />
              <p>Top Selling</p>
            </div>
          )}
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            {product.productName}
          </h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center gap-x-4 mb-4">
            <p className="text-3xl text-black font-bold">
              ₹{product.sellingPrice}
            </p>
            <p className="text-xl text-red-600 line-through font-medium">
              ₹{product.originalPrice}
            </p>
          </div>
          <div className="flex items-start gap-x-4 mb-4">
            <p className="whitespace-nowrap font-medium">Specification:</p>
            <p className="text-sm text-gray-500 w-full break-words">
              {product.specification}
            </p>
          </div>
          <p className="text-green-500 font-medium mb-4">
            {product.stock > 0
              ? `In stock (${product.stock} available)`
              : "Out of stock"}
          </p>
          <div className="flex gap-x-4 items-center mb-4">

            {/* Add to Cart Button */}
            <button
              className={`bg-black text-white font-semibold py-2 px-6 rounded ${
                product.stock > 0
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={product.stock === 0}
              onClick={handleAddOrder}
            >
              Add to cart
            </button>
            <button onClick={handleAddFavorite}>
                <FavoriteBorderIcon sx={{ fontSize: "36px", color: "black" }} />
            </button>
          </div>
          <p className="text-gray-800 font-medium">Lifetime Guarantee</p>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="w-[95%] mx-auto my-6">
        <h1 className="text-xl lg:text-3xl font-bold mb-6">Related Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProduct.map((product) => (
            <ProductsLayout product={product} key={product._id}/> 
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductOverview;


