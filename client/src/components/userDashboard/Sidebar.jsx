import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineFastfood,
  MdOutlineSettings,
} from "react-icons/md";
import { PiListHeart } from "react-icons/pi";

const MenuItems = [
  { name: "Overviews", Icons: <MdOutlineSpaceDashboard /> },
  { name: "Orders", Icons: <MdOutlineFastfood /> },
  { name: "WishList", Icons: <PiListHeart /> },
  { name: "Settings", Icons: <MdOutlineSettings /> },
];

const Sidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="space-y-3 py-3 px-2">
        {MenuItems.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center gap-3 border border-transparent hover:border-(--border-color) w-full rounded-lg p-3 px-2"
            onClick={() => setActive(item.name)}>
            {item.Icons}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
