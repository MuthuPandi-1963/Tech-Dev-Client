import React from 'react'
import BoatSlider from './Swiper';
import Footer from './Footer';
import Categorie from '../Shopping/Categorie';
import Brand from '../Shopping/Brand';
import Trending from './Trending';

const Home = () => {
  return (
    <>
      <div className="homepage-container">
  {/* Boat Slider Component */}
  <BoatSlider />

  {/* Categories Section */}
<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
  <Categorie BtnStyle="grid grid-flow-col gap-4 w-max" 
  imageStyle={"w-48 sm:w-52"} />
</div>
<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
  <Brand BtnStyle="grid grid-flow-col gap-4 w-max" imageStyle={"w-48 sm:w-52"}   />
</div>



  {/* Trending Section */}
  <Trending />
</div>

    </>
  )
}

export default Home;