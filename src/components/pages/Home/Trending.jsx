import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GetProductThunk from '../../../store/Thunks/Products/GetProductsThunk'; // Assuming this is the action to fetch products
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Link, useLocation } from 'react-router-dom';
import ProductsLayout from '../../layouts/ProductsLayout';

const Trending = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await dispatch(GetProductThunk());
      const TrendingProducts = productData.payload.filter(val=>val.trending)
      setProducts(TrendingProducts); // Assuming GetProductsThunk resolves with product data
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
    <div className="w-full lg:w-[95%] mx-auto my-6">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold mb-6 mx-4">Shop By Product</h1>
      </div>
      <div className="sm:grid max-sm:mx-10  max-sm:flex max-sm:flex-wrap   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
        {products.map((product) => (
          <ProductsLayout product={product} key={product._id}/>
        ))}
      </div>
    </div>
    </>
  );
};

export default Trending;
