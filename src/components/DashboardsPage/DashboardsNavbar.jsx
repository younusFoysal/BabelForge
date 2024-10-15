import { useAuth } from "@clerk/nextjs";
import logo from "@/image/Home/babellogo.png";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbarBox from "./DashboardNavbarBox";
import { SignedIn, UserButton } from "@clerk/nextjs";

const DashboardNavbar = () => {
  const Auth = useAuth();

  return (
    <div className="bg-white/30 backdrop-blur-lg dark:bg-[#0F172A]/60 border-b border-white/20 dark:border-gray-800/50 sticky top-0 right-0 z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-4">
        {/* logo */}
        <Link href="/">
          <div className="flex gap-1 justify-center items-center">
            <Image src={logo} alt="babelforge" className="w-full h-8" />
            <h3 className="text-3xl font-bold text-[#106ac5]">BabelForge</h3>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <DashboardNavbarBox />

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 mr-4">
          {Auth && (
            <div className="md:flex items-center space-x-4 mr-4">
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action label="signOut" />
                      <UserButton.Action label="manageAccount" />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
