"use client";

import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../store/Context/AuthContext";
import GetCategoryThunk from "../../store/Thunks/Products/GetCategoryThunk";
// Icons
import {
  ExitToApp as ExitToAppIcon,
  FavoriteBorder as FavoriteBorderIcon,
  DevicesOther as DevicesOtherIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Category as CategoryIcon,
  Whatshot as WhatshotIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  ProductionQuantityLimits as ProductionQuantityLimitsIcon,
  CancelPresentation as CancelPresentationIcon,
  Menu as MenuIcon,
  KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon,
  HomeOutlined,
} from "@mui/icons-material";
import Footer from "../pages/Home/Footer";
import Logo from "../pages/Home/Logo";
import ProfileLayout from "./ProfileLayouts";
import Profile from "../pages/Profille/Profile";
import MobileNavBar from "../pages/NavBar/MobileNavBar";
import React from "react";
import Button from "../../utilities/Button";

// Navigation links
const navigation = [
  { name: "Categories", link: "/shopping/category", icon: <CategoryIcon /> },
  {
    name: "Products",
    link: "/shopping/products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  { name: "Brands", link: "/shopping/brand", icon: <LocalGroceryStoreIcon /> },
  { name: "Trending", link: "/shopping/trending", icon: <WhatshotIcon /> },
];

export default function HomeLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { authState, authDispatch } = useContext(AuthContext);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(GetCategoryThunk());
      setCategories(response.payload);
    };
    fetchCategories();
  }, [dispatch]);

  const toggleCategories = () => setCategoriesOpen((prev) => !prev);

  return (
    <>
      <div className="bg-white">
        <header className="inset-x-0  z-50 shadow-md sticky top-0">
          <nav className="  flex items-center justify-between px-4 py-3 lg:px-8 bg-gray-50">
            {/* Logo */}
            <Logo />
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
            <div className="flex  gap-x-4 items-center mx-4">
            <Link to={"/"}>
              <HomeOutlined />
            </Link>
            <Link to={`/orders/favorite/${user.id}`}>
              <FavoriteBorderIcon />
            </Link>
            <Link to={`/orders/carts/${user.id}`}>
              <LocalMallOutlinedIcon sx={{color:"black"}} />
            </Link>
          </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
              >
                <MenuIcon />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-10">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="text-md font-semibold text-gray-900 hover:underline"
                >
                  {item.name === "Categories" ? (
                    <div
                      onMouseEnter={() => setCategoriesOpen(true)}
                      onMouseLeave={() => {
                        setTimeout(() => setCategoriesOpen(false), 500); // Add a 300ms delay
                      }}
                      className="relative"
                    >
                      <div className="flex">
                        <button className="flex items-center">
                          <Link to={item.link}>{item.name}</Link>
                        </button>
                        <button>
                          <KeyboardArrowDownOutlinedIcon />
                        </button>
                      </div>
                      {categoriesOpen && (
                        <div className="absolute -left-12 mt-2 p-6 bg-white shadow-lg rounded-lg shadow-gray-500 w-max z-50 grid grid-cols-3 transition-opacity duration-300">
                          {categories.map((category) => (
                            <Link
                              key={category._id}
                              to={`shopping/category/${
                                category._id + "_" + category.categoryName
                              }`}
                              className="grid justify-center justify-items-center hover:shadow-lg hover:shadow-blue-600 hover:scale-110 items-center gap-4 hover:bg-gray-100 shadow-md shadow-sky-100 p-2 rounded-lg"
                            >
                              <img
                                src={category.CategoryNavbarImage}
                                alt={category.categoryName}
                                className="h-16"
                              />
                              <span>{category.categoryName}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={item.link}>{item.name}</Link>
                  )}
                </div>
              ))}
            </div>

            {/* User Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-4">
              {user?.id ? (
                <div className="flex items-center gap-x-4">
                  <Link to={"/"}>
                    <HomeOutlined />
                  </Link>
                  <Link to={`/orders/favorite/${user.id}`}>
                    <FavoriteBorderIcon />
                  </Link>
                  <Link to={`/orders/carts/${user.id}`}>
                    <LocalMallOutlinedIcon />
                  </Link>
                  <button onClick={() => setOpen(true)}>
                    <AccountCircleOutlinedIcon />
                  </button>
                  <Profile open={open} setOpen={setOpen} />
                  {user?.role === "admin" && (
                    <>
                      <Link to={"/admin"}
                      className="text-md font-medium"
                      >
                          Admin
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => authDispatch({ type: "login" })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Login
                </Button>
              )}
            </div>
            
          </nav>

          {mobileMenuOpen && (
            <MobileNavBar
              user={user}
              navigation={navigation}
              categories={categories}
              categoriesOpen={categoriesOpen}
              setCategoriesOpen={setCategoriesOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              authDispatch={authDispatch}
            />
          )}
        </header>

        {/* Page Content */}
        <main className="ml-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
