import React from "react";
import { Link, Outlet } from "react-router-dom";
import { DiamondIcon } from "../../utilities/Icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
const NAVIGATION = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    segment: "Brands",
    title: "Brands",
    icon: <CategoryIcon />,
  },
  {
    segment: "categories",
    title: "Categories",
    icon: <CategoryIcon />,
  },
  {
    segment: "features",
    title: "Features",
    icon: <WhatshotIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <LocalGroceryStoreIcon />,
  },
];

function Sidebar() {
  return (
    <div
      className="bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 
        lg:w-64 w-16 fixed  top-0 bottom-0 left-0 "
    >
      {/* Header */}
      <div className="flex items-center p-4 text-center border-b border-gray-700">
        <DiamondIcon classStyle="text-white w-9 h-9" color="white" />
        <h1 className="text-xl font-bold hidden lg:block">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 relative">
        {NAVIGATION.map((item) => (
          <div
            key={item.segment}
            className="group flex-1 items-center lg:justify-stretch justify-center relative hover:pr-4"
          >
            <Link
              to={`/admin/${item.segment}`}
              className="flex items-center lg:px-4 p-4  hover:bg-gray-700 hover:scale-110 "
            >
              {item.icon}
              <span className="ml-4 hidden lg:inline ">{item.title}</span>
            </Link>
            {/* Popup title for mobile */}
            <span className="absolute right-[-70px] top-7 text-sm font-medium bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-300 lg:hidden">
              {item.title}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
}

function AdminLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 bg-gray-100 ml-24">
        <div className="p-4">
          {/* Topbar */}
          <div className="flex items-center gap-x-6 justify-end">
            <div className="">
              <Link to={"/"} className="">
                <HomeIcon sx={{ fontSize: "30px" }} />
              </Link>
            </div>
            <div className="flex justify-end items-center space-x-1">
              <AccountCircleIcon sx={{ fontSize: "26px" }} />
              <p className="text-lg font-medium">{user.username}</p>
            </div>
          </div>
          {/* Main Content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
