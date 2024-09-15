import { MoreHorizontal } from "lucide-react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={"/"}>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full ml-1"></div>
            </div>
          </Link>
          <span className="text-sm text-gray-600">Draft in Kirags</span>
          <span className="text-sm text-gray-400">Saved</span>
        </div>
        <div className="flex items-center space-x-4">
          <MoreHorizontal className="text-gray-400 cursor-pointer" />
          <Link to={'/publish'}>
          <button
            type="button"
            className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
          </Link>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-sm text-gray-600">
              <Avatar name="Pranith kumar" size={8} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
