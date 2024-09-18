import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-5">
        {/* logo */}
        <div>
          <img src="./logo.png" alt="babelforge" className="w-40 -mt-6" />
        </div>

        <nav className="hidden md:flex">
          {/* menu items */}
          <ul className="flex space-x-6 items-center justify-center ">
            <li>Product</li>
            <li>Team</li>
            <li>Platform</li>
            <li>Work</li>
          </ul>
        </nav>

        <div className="md:flex items-center space-x-4 hidden">
          <ul className="flex items-start space-x-4">
            <li>price</li>
            <li>Login</li>
          </ul>
          <button className="px-6 py-3 capitalize bg-primary text-white rounded-3xl text-sm flex gap-1 items-center">
            <span>get started</span>
            <IoMdArrowForward size={15} />
          </button>
        </div>
        {/* menu button */}
        <div className="flex md:hidden">
          <IoMenuSharp size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
