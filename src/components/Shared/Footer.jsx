import { FaFacebook, FaInstagram, FaLinkedinIn, FaReddit, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="p-2 lg:p-10 text-gray-500 border">
            {/* upper part */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 items-center justify-between border-b pb-12">
                <div className="flex flex-col space-y-1 text-sm ">
                    <img className="w-32 mx-auto" src="./Footer/logo.png" alt="babelforge" />
                    <p className="text-black text-center">Where Teams Forge Success.</p>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full ">
                    <h3 className="text-xl font-semibold">Company</h3>
                    <a href="">About Us</a>
                    <a href="">Pricing</a>
                    <a href="">Contact Us</a>
                    <a href="">Templates</a>
                    <a href="">24/7 support</a>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full ">
                    <h3 className="text-xl font-semibold">Features</h3>
                    <a href="">Create Projects</a>
                    <a href="">Dashboards</a>
                    <a href="">Issue Tracking</a>
                    <a href="">Reporting</a>
                    <a href="">Communicate</a>
                </div>
                <div className="flex flex-col  space-y-3 text-sm h-full ">
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
                    <div className="flex gap-2 items-center justify-center md:justify-start text-xl">
                        <FaReddit />
                        <FaLinkedinIn />
                        <FaFacebook />
                        <FaYoutube />
                        <FaXTwitter />
                        <FaInstagram />
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
                        <a href=""><img src="./Footer/google.png" alt="" /></a>
                        <a href=""><img src="./Footer/apple.png" alt="" /></a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;