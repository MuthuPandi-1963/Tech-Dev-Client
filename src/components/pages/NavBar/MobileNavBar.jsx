import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '../../../utilities/Button' // Assuming you have a custom Button component
import Logo from '../Home/Logo';
import { useDispatch, useSelector } from 'react-redux';
import LogoutThunk from '../../../store/Thunks/Authentication/LogoutThunk';

const MobileNavBar = ({ navigation, categories, categoriesOpen, setCategoriesOpen, setMobileMenuOpen, authDispatch }) => {
  const dispatch = useDispatch()
  const {user, isAuthenticated} = useSelector(state=>state.auth)
  return (
    <div>
      {/* Overlay to dim the background when menu is open */}
      <div
        className={`fixed inset-0  bg-gray-500 transition-opacity duration-300 ${user ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        style={{ visibility: user ? 'visible' : 'hidden' }}
        onClick={() => setMobileMenuOpen(false)} // Close the menu when clicking the background
      ></div>

      {/* Mobile menu */}
      <div
        className={`fixed right-0 rounded-tl-xl  bottom-0 top-0 z-50 px-4 w-[320px] bg-white shadow-lg transform transition-all duration-500 ease-in-out ${
          user ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        {/* Header for Mobile Menu */}
        <div className="flex items-center justify-between px-6 py-3">
          {user.username ? (
            <div className="grid gap-y-3">
              <div className="flex items-center gap-x-3">
                <AccountCircleOutlinedIcon />
                <p className="text-xl font-medium">{user.username}</p>
              </div>
            </div>
          ) : (
            <Logo /> // Placeholder for your logo
          )}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded p-2.5 text-gray-700"
          >
            <CancelPresentationIcon sx={{ color: "black" }} />
          </button>
        </div>

        

        {/* Navigation Items */}
        <div className="mt-6">
          {navigation.map((item) =>
            item.name === "Categories" ? (
              <div key={item.name} className="relative">
                <div className="flex justify-start">
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="w-full flex justify-between items-center rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-x-2">
                      {item.name}
                    </div>
                    <KeyboardArrowDownOutlinedIcon />
                  </button>
                </div>
                {categoriesOpen && (
                  <div className="grid grid-cols-2 gap-6 my-6">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`shopping/category/${category._id + "_" + category.categoryName}`}
                        className="relative w-full flex justify-center cursor-pointer shadow-sm shadow-gray-500 hover:scale-105 duration-300 rounded-lg bg-white text-gray-900 hover:shadow-blue-800 hover:shadow-lg group"
                      >
                        <img
                          src={category.CategoryNavbarImage}
                          alt={category.categoryName}
                          className="h-14 my-1"
                        />
                        <p className="absolute -top-3 whitespace-nowrap text-sm font-medium bg-gray-300 text-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-[-5px] transition-all duration-300">
                          {category.categoryName}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.link}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                <div className="flex items-center gap-x-2">
                  {item.name}
                </div>
              </Link>
            )
          )}
          <div className="flex my-4 gap-x-4 items-center mx-4">
            <Link to={"/"}>
              <HomeOutlined />
            </Link>
            <Link to={`/orders/favorite/${user.id}`}>
              <FavoriteBorderIcon />
            </Link>
            <Link to={`/orders/carts/${user.id}`}>
              <LocalMallOutlinedIcon />
            </Link>
            {isAuthenticated &&
            <button onClick={()=>dispatch(LogoutThunk())}>
            <ExitToAppIcon />
            </button> }
          </div>
          {/* User Profile Section */}
        {!user?.username && (
          <Button
            onClick={() => authDispatch({ type: "login" })}
            BtnStyle=" ring-1 px-2 rounded mx-6 cursor-pointer hover:bg-blue-400 bg-blue-600"
            className="text-sm font-semibold text-gray-900 mt-6"
          >
            Login
          </Button>
        )}
        {user?.role === "admin"&&(
          <>
          <Link to={"/admin"}>
          <Button
            BtnStyle=" ring-1 px-2 rounded-lg mx-6 cursor-pointer ring-2 hover:bg-blue-200 bg-white"
            className="text-sm font-semibold text-gray-900 mt-6"
            >
            Go to AdminPage
          </Button>
            </Link>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
