import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import Button from "./Button";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50 z-50">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-5">
        {/* logo */}
        <Link to="/"><div>
          <img src="./Home/logo.png" alt="babelforge" className="w-40 -mt-6" />
        </div>
        </Link>

        <nav className="hidden md:flex">
          {/* menu items */}
          <ul className="flex space-x-6 items-center justify-center ">
            <li>Product</li>
            <li>Team</li>
            <li>Platform</li>
            <li>Work</li>
            <Link to="/contactus"><li className="hover:text-blue-500">Contact Us</li></Link>
          </ul>
        </nav>

        <div className="md:flex items-center space-x-4 hidden">
          <ul className="flex items-start space-x-4">
            <Link to="/pricing">
              <li className="hover:text-blue-500">Price</li>
            </Link>

            <li>Login</li>
          </ul>
          <Button text="get started" icon={<IoMdArrowForward size={20} />} />
        </div>
        {/* menu */}
        <div className="flex md:hidden">
          <IoMenuSharp size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
