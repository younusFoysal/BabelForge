import React from "react";
import SidebarButtonBox from "./SidebarButtonBox";
import { TbHome, TbUserPentagon } from "react-icons/tb";

const AdminCurrentBox = ({ currentSidebarTab, setIsSidebarOpen }) => {
  return (
    <div>
      {currentSidebarTab === "homeTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<TbHome size={20} />}
            label="Home"
            href="/"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<TbUserPentagon size={20} />}
            label="Dashboard"
            href="/dashboard"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCurrentBox;
