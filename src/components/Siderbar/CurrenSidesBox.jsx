import React from "react";
import { CgList } from "react-icons/cg";
import { FaDraftingCompass } from "react-icons/fa";
import { FaPencil, FaUsersGear } from "react-icons/fa6";
import { MdOutlineNoteAlt, MdPostAdd } from "react-icons/md";
import { PiChatsLight } from "react-icons/pi";
import { TbBrandZoom, TbHome, TbUserPentagon } from "react-icons/tb";
import SidebarButtonBox from "./SidebarButtonBox";
import { RiWechatChannelsLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";

const CurrenSidesBox = ({ currentSidebarTab, setIsSidebarOpen }) => {
  return (
    <>
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
      {currentSidebarTab === "projectTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<FaDraftingCompass size={20} />}
            label="projects"
            href="/dashboard/projects"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<FaUsersGear size={20} />}
            label="teams"
            href="/dashboard/teams"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
      {currentSidebarTab === "taskTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<MdPostAdd size={20} />}
            label="Backlog"
            href="/dashboard/Backlog"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<CgList size={20} />}
            label="board"
            href="/dashboard/board"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
      {currentSidebarTab === "ChatTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<PiChatsLight size={20} />}
            label="Group Chat"
            href="/dashboard/chat"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<TbBrandZoom size={20} />}
            label="Meeting"
            href="/dashboard/meeting"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
      {currentSidebarTab === "toolsTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<RiWechatChannelsLine size={20} />}
            label="Babel AI"
            href="/dashboard/babelai"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<FaPencil size={20} />}
            label="Canvas"
            href="/dashboard/canvas"
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarButtonBox
            icon={<MdOutlineNoteAlt size={20} />}
            label="Notes"
            href="/dashboard/notes"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
      {currentSidebarTab === "moreTab" && (
        <div className="flex flex-col gap-4">
          <SidebarButtonBox
            icon={<BsStars size={20} />}
            label="Review"
            href="/dashboard/review"
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
    </>
  );
};

export default CurrenSidesBox;
