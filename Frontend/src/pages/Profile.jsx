import { useState } from "react";
import ProfileDetails from "../components/ProfileDetails";
import MenuItem from "../components/MenuItem";
import { User, Heart, LogOut, Brain } from "lucide-react";

// connecting buttons
import axios from "axios";
import { useAuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [view, setView] = useState("menu");

  const { setCurrentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setCurrentUser(null); // clear context
      navigate("/login"); // go to login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[380px] h-[700px] rounded-[33px] bg-white relative top-[15px] shadow flex flex-col items-center select-none">
      {/* ⚪ MENU SECTION */}
      {view === "menu" ? (
        <div className="w-[85%] mt-[6%] space-y-[4%] text-gray-800">
          <MenuItem
            icon={<User />}
            label="My Profile"
            onClick={() => setView("details")}
          />
          <MenuItem icon={<Brain />} label="Nutrition Tips" />
        </div>
      ) : (
        <ProfileDetails onBack={() => setView("menu")} />
      )}

      {/* 🚪 LOGOUT */}
      <div className="w-[85%] mt-auto mb-[6%]">
        <div className="border-t border-gray-200 pt-[5%]">
          <button
            onClick={handleLogout}
            className="w-full py-[3%] bg-[#79c66e] hover:bg-[#6bb85d] active:scale-[0.98] transition rounded-full flex items-center justify-center gap-2 font-medium font-2-regular"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
