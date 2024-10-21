import Link from "next/link";
import React from "react";

const SidebarButtonBox = ({ icon, label, href, setIsSidebarOpen }) => {
  return (
    <div className="text-white" onClick={() => setIsSidebarOpen(false)}>
      <Link
        href={href}
        class="flex items-center w-full space-x-2  bg-blue-600 rounded-lg hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-md hover:shadow-[#0362F3FF]/30 font-medium"
      >
        <span aria-hidden="true" class="p-2 bg-blue-600 rounded-lg">
          {icon}
        </span>
        <span className="capitalize">{label}</span>
      </Link>
    </div>
  );
};

export default SidebarButtonBox;
