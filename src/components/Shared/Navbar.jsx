import { useState } from "react";
import { IoMdMenu, IoMdClose, IoMdArrowForward } from "react-icons/io";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50 z-50">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-5">
        {/* logo */}
        <Link to="/">
          <img src="./Home/logo.png" alt="babelforge" className="w-40 -mt-6" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center justify-center">
            <li>Product</li>
            <li>Team</li>
            <li>Platform</li>
            <li>Work</li>
            <Link to="/contactus">
              <li className="hover:text-blue-500">Contact Us</li>
            </Link>
          </ul>
        </nav>

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 hidden">
          <ul className="flex items-start space-x-4">
            <Link to="/pricing">
              <li className="hover:text-blue-500">Price</li>
            </Link>
            <li>Login</li>
          </ul>
          <Button text="Get Started" icon={<IoMdArrowForward size={20} />} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-4  py-4">
            <li className="border-b border-gray-100 pb-3 px-6">Product</li>
            <li className="border-b border-gray-100 pb-3 px-6">Team</li>
            <li className="border-b border-gray-100 pb-3 px-6">Platform</li>
            <Link to="/contactus">
              <li className="border-b border-gray-100 pb-3 px-6">Contact Us</li>
            </Link>
            <Link to="/pricing">
              <li className="border-b border-gray-100 pb-3 px-6">Price</li>
            </Link>
            <li className="border-b border-gray-100 pb-3 px-6">Login</li>
            <li>
              <div className="w-full items-center justify-center flex">
                <Button
                  text="Get Started"
                  icon={<IoMdArrowForward size={20} />}
                />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
