import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
const AdminMenubar = ({ isSidebarOpen, currentSidebarTab, item }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.links}
            className={`p-2 transition-colors rounded-lg shadow-md hover:bg-bgColor hover:text-white focus:outline-none focus:ring focus:ring-bgColor focus:ring-offset-white focus:ring-offset-2 ${
              isSidebarOpen && currentSidebarTab === item.tab
                ? "text-white bg-bgColor"
                : "text-white bg-slate-600"
            }`}
          >
            {item.icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-slate-900 text-white outline-none rounded-sm text-xs border-slate-800 z-[99999]"
        >
          <p>{item.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AdminMenubar;
