import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GetBrandThunk from '../../../store/Thunks/Products/GetBrandThunk'; // Assuming this is the action to fetch brands
import { Link, useLocation } from 'react-router-dom';
const Brand = ({BtnStyle}) => {
  const [brandItems, setBrandItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await dispatch(GetBrandThunk());
      setBrandItems(brands.payload); // Assuming GetBrandThunk resolves with brand data
    };
    fetchBrands();
  }, [dispatch]);

  return (
    <>
    <div className="w-[95%] mx-auto my-6">
      <div>
        <h1 className="lg:text-3xl text-xl font-bold mb-6">Shop By Brand</h1>
      </div>
      <div className={BtnStyle}>
        {brandItems.map((brand, index) => (
          <Link
          to={brand._id+"_"+brand.brandName}
          key={index}
            className="lg:w-64 w-48 relative brand-card shadow-lg rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={brand.brandImg}
              alt={brand.brandName}
              className="lg:w-64 lg:h-80 w-48 h-64 object-cover"
            />
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
          </>
  );
};

export default Brand;
