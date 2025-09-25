import React from "react";
import { Add } from "@mui/icons-material";

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between bg-[#060606] shadow-md rounded-xl px-6 py-4 mb-6 border border-yellow-700">
      <h1 className="text-2xl font-bold text-[#d7d5d5] flex items-center">
        Restaurants <span className="ml-2">🍽️</span>
      </h1>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-gradient-to-r from-[#daba06] to-[#efa503] text-white px-5 py-2 rounded-lg shadow  hover:to-[#f6a902] hover:scale-105 cursor-pointer transition-all duration-200"
      >
        <Add fontSize="small" />
        <span className="font-medium">Add Restaurant</span>
      </button>
    </div>
  );
};

export default Header;
