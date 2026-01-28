import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const navigate  = useNavigate();
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/login", user, {
        headers: { "Content-Type": "application/json"  },
        withCredentials:true
      });
      setCurrentUser({...res.data.user});
      alert(`Login successful! Welcome ${res.data.user?.email || user.email}`);
      navigate('/');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // e.g. "Invalid credentials"
      }
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setUser({ email: "", password: "" });
  };

  return (
    <div className="w-[380px] h-[557px] rounded-[33px] bg-white relative top-[15px] shadow-[0_4px_4px_#000] flex items-center justify-center">
      <div className="text-[#00540E] w-full absolute top-[65px] flex flex-col items-center">
        <h1 className="font-semibold text-4xl">Login</h1>
        <p className="pt-1">
          Already have an account?{" "}
          <Link to="/signup" className="text-purple underline cursor-pointer font-bold">
            SignUp
          </Link>
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="absolute top-[175px] left-9 space-y-6">
          <input
            value={user.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="w-[308px] h-[54px] text-black rounded-[10px] bg-[#DBDBDB] px-4 py-3 border-2 placeholder-[#292D34] focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            value={user.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="w-[308px] h-[54px] text-black rounded-[10px] bg-[#DBDBDB] px-4 py-3 border-2 placeholder-[#292D34] focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            className="border-2 px-4 py-2 rounded-[10px] bg-blue-100 text-red"
            onClick={resetHandler}
          >
            Reset
          </button>
        </div>
        <div className="absolute bottom-16 left-28">
          <button
            type="submit"
            disabled={loading}
            className={`w-[156px] h-[49px] rounded-[100px] border border-black ${
              loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#77FE77] text-[#272727]"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
