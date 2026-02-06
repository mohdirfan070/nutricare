import React, { useState } from "react";
import ProfileDetails from "../components/ProfileDetails";
import MenuItem from "../components/MenuItem";
import {
  User,
  Heart,
  LogOut,
  Brain,
} from "lucide-react";

export default function Profile() {
  const [view, setView] = useState("menu");

  return (
    <div className="w-[380px] h-[700px] rounded-[33px] bg-white relative top-[15px] shadow flex flex-col items-center">
      {/* 👤 AVATAR */}
      <div className="flex justify-center mt-[8%]">
        <div className="relative w-[110px] h-[110px]">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-full h-full rounded-full object-cover border-[3px] border-[#79c66e] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
          />
          <div className="absolute bottom-1 right-1 w-7 h-7 bg-[#c6f7c0] rounded-full flex items-center justify-center shadow text-[12px]">
            ✏️
          </div>
        </div>
      </div>

      {/* ⚪ MENU SECTION */}
      {view === "menu" ? (
        <div className="w-[85%] mt-[6%] space-y-[4%] text-gray-800">
          <MenuItem
            icon={<User />}
            label="My Profile"
            onClick={() => setView("details")}
          />
          {/* <MenuItem icon={<Mail />} label="Messages" badge="7" /> */}
          <MenuItem icon={<Heart />} label="Favorites" />
          {/* <MenuItem icon={<MapPin />} label="Location" active /> */}
          <MenuItem icon={<Brain />} label="Nutrition Tips" />
          {/* <MenuItem icon={<Settings />} label="Settings" /> */}
        </div>
      ) : (
        <ProfileDetails onBack={() => setView("menu")} />
      )}

      {/* 🚪 LOGOUT */}
      <div className="w-[85%] mt-auto mb-[6%]">
        <div className="border-t border-gray-200 pt-[5%]">
          <button className="w-full py-[3%] bg-[#79c66e] hover:bg-[#6bb85d] active:scale-[0.98] transition rounded-full flex items-center justify-center gap-2 font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
