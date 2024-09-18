
const Footer = () => {
    return (
        <footer className="border flex items-center justify-between text-gray-500 p-10">
            <div className="flex flex-col space-y-2 text-sm border">
                <img className="border w-32 mx-auto" src="./logo.png" alt="babelforge" />
                <p className="text-black">Where Teams Forge Success.</p>
            </div>
            <div className="flex flex-col border space-y-3 text-sm">
                <h3 className="text-xl font-semibold">Company</h3>
                <a href="">About Us</a>
                <a href="">Pricing</a>
                <a href="">Contact Us</a>
                <a href="">Templates</a>
                <a href="">24/7 support</a>
            </div>
            <div className="flex flex-col border space-y-3 text-sm">
                <h3 className="text-xl font-semibold">Features</h3>
                <a href="">Create Projects</a>
                <a href="">Dashboards</a>
                <a href="">Issue Tracking</a>
                <a href="">Reporting</a>
                <a href="">Communicate</a>
            </div>
            <div className="flex flex-col border space-y-3 text-sm">
                <h3 className="text-xl font-semibold">Use Cases</h3>
                <a href="">Technology</a>
                <a href="">Education</a>
                <a href="">Project Management</a>
                <a href="">Non-Profit Organization</a>
                <a href=""></a>
            </div>
        </footer>
    );
};

export default Footer;