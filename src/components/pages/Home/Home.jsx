import React from 'react'
import BoatSlider from './Swiper';
import Footer from './Footer';
import Categorie from '../Shopping/Categorie';
import Brand from '../Shopping/Brand';
import Trending from './Trending';

const Home = () => {
  return (
    <>
      <BoatSlider/>
      <Trending/>
      {/* <Categorie BtnStyle="grid grid-flow-col gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4"/> */}
      {/* <Brand BtnStyle="grid grid-flow-col gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4"/> */}
    </>
  )
}

export default Home;