import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { DiamondIcon } from "../../../utilities/Icons";
import GoogleIcon from '@mui/icons-material/Google';
import Logo from "./Logo";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pb-10 lg:px-10 px-6">
      {/* Company Info */}
      <div className="lg:flex justify-between lg:pt-6">
        <Icons classStyle="lg:hidden flex justify-end lg:pt-6" />
        <div className="grid mt-4 lg:mt-0">
            <Logo Color="text-white"/>
          <p className="text-gray-400 mt-1 lg:mt-4">
            Making the world a better place through constructing elegant hierarchies.
          </p>
        </div>
        <Icons classStyle="hidden lg:flex" />
      </div>

      {/* Footer Links */}
      <div className="grid lg:grid-cols-5 grid-cols-2 justify-center  lg:gap-8 mt-10">
        {/* Shop Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Earphones</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Headphones</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Speakers</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Smartwatches</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Accessories</a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="hidden lg:block">
          <h3 className="text-xl font-bold mb-4 ">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Track Order</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Warranty</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Return Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
            </li>
          </ul>
        </div>

        {/* About & Legal Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Our Story</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Careers</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Press</a>
            </li>
          </ul>
          </div>
          <div className="hidden lg:block">
          <h3 className="text-xl font-bold  mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-6">
        © 2025 Tech-Dev, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

// Icons Component
function Icons({ classStyle }) {
  return (
    <div className={`space-x-4 mt-4 ${classStyle}`}>
      <a href="#" className="text-gray-400 hover:text-white">
        < GoogleIcon/>
      </a>
      <a href="#" className="text-gray-400 hover:text-white">
        <InstagramIcon />
      </a>
      <a href="#" className="text-gray-400 hover:text-white">
        <LinkedInIcon />
      </a>
      <a href="#" className="text-gray-400 hover:text-white">
        <GitHubIcon />
      </a>
    </div>
  );
}
