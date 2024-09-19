import { FaFacebook, FaInstagram, FaLinkedinIn, FaReddit, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="p-2 md:p-16 pt-10 text-gray-500 bg-sky-50">
            {/* upper part */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 items-center justify-between border-b pb-12">
                <div className="flex flex-col space-y-1 text-sm">


                    {/* logo */}
                    <Link to="/">
                        <div className="flex gap-1 justify-center lg:justify-start items-center ">
                            <img src="./Home/babellogo.png" alt="babelforge" className=" size-6 lg:size-14 "/>
                            <h3 className="text-3xl font-bold text-[#106ac5]">BabelForge</h3>
                        </div>
                    </Link>

                    <p className="text-center md:text-start text-xs font-semibold">Where Teams Forge Success.</p>
                    <p className="text-center md:text-start pt-3 text-xs">BabelForge – Streamlining teamwork, task management, and collaboration for your team’s success.</p>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
                    <h3 className="text-xl font-semibold">Company</h3>
                    <a href="">About Us</a>
                    <a href="">Pricing</a>
                    <a href="">Contact Us</a>
                    <a href="">Templates</a>
                    <a href="">24/7 support</a>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
                    <h3 className="text-xl font-semibold">Features</h3>
                    <a href="">Create Projects</a>
                    <a href="">Dashboards</a>
                    <a href="">Issue Tracking</a>
                    <a href="">Reporting</a>
                    <a href="">Communicate</a>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
                    <h3 className="text-xl font-semibold">Use Cases</h3>
                    <a href="">Technology</a>
                    <a href="">Education</a>
                    <a href="">Project Management</a>
                    <a href="">Non-Profit Organization</a>
                    <a href=""></a>
                </div>
            </div>

            {/* lower part */}
            <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0">
                <div className="space-y-3 text-center md:text-start">
                    <div className="flex gap-2 items-center justify-center md:justify-start text-2xl">
                        <Link><FaReddit /></Link>
                        <Link><FaLinkedinIn /></Link>
                        <Link><FaFacebook /></Link>
                        <Link><FaYoutube /></Link>
                        <Link><FaXTwitter /></Link>
                        <Link><FaInstagram /></Link>
                    </div>
                    <div className="text-sm font-light">
                        <a href=""> Security |</a>
                        <a href=""> Terms and privacy |</a>
                        <a href=""> Privacy policy |</a>
                        <a href=""> Status</a>
                    </div>
                    <p className="text-sm font-light">All Rights Reserved © babelforge.com</p>
                </div>
                <div className="space-y-2">
                    <p className="text-center">Download Our App</p>
                    <div className="w-64 flex gap-2">
                        <a href=""><img src="./Footer/google.png" alt="google play stoe" /></a>
                        <a href=""><img src="./Footer/apple.png" alt="Ios App store" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;