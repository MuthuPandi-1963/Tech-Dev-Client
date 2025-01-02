import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetBrandThunk from '../../../store/Thunks/Products/GetBrandThunk';
import { Link } from 'react-router-dom';
import LazyImage from '../../../helpers/LazyImages';
import { productStore } from '../../../store/Context/StateCall';
import SkeletonFlex from '../../../helpers/skeleton/CategorySkeleton';

const Brand = ({ BtnStyle, imageStyle }) => {
  const [brandItems, setBrandItems] = useState([]);
  const {isLoading:loading , error } = useSelector(productStore)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await dispatch(GetBrandThunk());
        setBrandItems(brands.payload); // Assuming GetBrandThunk resolves with brand data
      } catch (err) {
        console.err('Failed to fetch brands'); // Handle error
      }
    };
    fetchBrands();
  }, [dispatch]);

  if (loading) {
    return <SkeletonFlex loading={true} /> // Display a loading message or skeleton
  }

  if (error) {
    return <div>{error}</div>; // Display the error message if something goes wrong
  }

  return (
    <div className="w-[95%] mx-auto my-2 lg:mb-10">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold my-4">Shop By Brand</h1>
      </div>
      <div className={BtnStyle}>
        {brandItems.map((brand) => (
          <Link
            to={`/shopping/brand/${brand._id}_${brand.brandName}`}
            key={brand._id} // Use unique ID as key instead of index
            className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg ${imageStyle}`}
          >
            <div className="w-full h-56 sm:h-60 lg:h-72 relative">
              <LazyImage
                src={brand.brandImg}
                alt={brand.brandName}
                className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 ${imageStyle}`}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold">{brand.brandName}</h2>
                <p className="text-sm">{brand.brandDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brand;
