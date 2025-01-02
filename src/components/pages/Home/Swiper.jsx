import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch } from "react-redux";
import GetFeatureThunk from "../../../store/Thunks/Products/GetFeatureThunk";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const GadgetSlider = () => {
  const [slider, setSlider] = useState([]);
  const dispatch = useDispatch();
  const swiperRef = useRef(null); // Create a reference for the swiper instance

  useEffect(() => {
    const fetchFeatures = async () => {
      const Features = await dispatch(GetFeatureThunk());
      setSlider(Features.payload);
    };
    fetchFeatures();
  }, [dispatch]);

  useEffect(() => {
    // Trigger Swiper update after state change
    if (swiperRef.current) {
      swiperRef.current.swiper.update(); // Update swiper
    }
  }, [slider]); // Runs every time slider is updated

  return (
    <div className="mt-2 w-[95%] mx-auto">
      {slider.length === 0 ? (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  ) : (
        <Swiper
          ref={swiperRef} // Attach the ref to the Swiper component
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={30}
          slidesPerView={1}
        >
          {slider.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`lg:flex grid justify-center w-full ${
                  slide.Position === "left"
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                } items-center`}
              >
                <div className="lg:p-4 px-4 pb-8 flex-grow-1 order-1 self-start lg:pt-12">
                  <h2 className="text-2xl lg:text-5xl mb-2 font-bold">
                    {slide.Title}
                  </h2>
                  <p>{slide.Description}</p>
                  <div className="flex gap-x-6 lg:mt-6 my-2">
                    <Link to={`/shopping/category/${slide.categoryType+"_"+slide.Title}`}>
                      <button className="lg:px-6 mt-4 bg-blue-800 text-white px-4 py-2 rounded">
                        Buy {slide.Title}
                      </button>
                    </Link>
                    <Link to="/shopping/products">
                      <button className="lg:px-10 font-bold hover:bg-sky-100 mt-4 bg-transparent ring-2 text-black px-4 py-2 rounded-lg">
                        Explore Now
                      </button>
                    </Link>
                  </div>
                </div>
                <img
                  src={slide.Image}
                  alt={slide.Title}
                  className="rounded-xl lg:h-[500px] h-[200px] w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default GadgetSlider;
