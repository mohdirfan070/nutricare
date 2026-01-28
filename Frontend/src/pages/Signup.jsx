import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    allergens: "",
    height: "",
    weight: "",
    dietaryPreferences: "",
    goals: "",
    language: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Convert comma-separated strings into arrays
      const payload = {
        ...formData,
        allergens: formData.allergens
          ? formData.allergens.split(",").map((a) => a.trim())
          : [],
        dietaryPreferences: formData.dietaryPreferences
          ? formData.dietaryPreferences.split(",").map((d) => d.trim())
          : [],
      };

      const res = await axios.post(
        "http://localhost:8080/auth/signup",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Signup success:", res.data);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error(`Signup error: ${error.message}`, error.response?.data || error.message);
      alert(`Signup error: ${error.response?.data.message}`);
    }
  };

  return (
    <div className="w-[95%] h-[75dvh] rounded-[33px] bg-[#fff] relative top-[15px] shadow-md flex flex-col items-center justify-center ">
      <div className="text-[#00540E] w-full  flex flex-col items-center">
        <h1 className="font-semibold text-4xl">SignUp</h1>
        <p className="pt-1 text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sharpgreen font-bold underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="
         flex justify-center flex-col top-[150px]  space-y-6  "
      >
        {step === 1 && (
          <>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password (must be 6 characters)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
              min={1}
              placeholder="Age"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            {/* <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              type="text"
              placeholder="Gender (male/female)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            /> */}
            <select
              name="gender"
              onChange={handleChange}
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
              id=""
            >
               <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-[156px] h-[49px] bg-[#77FE77] text-[#272727] rounded-[100px] border border-black mt-4"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="allergens"
              value={formData.allergens}
              onChange={handleChange}
              type="text"
              placeholder="Allergens (Wheat, milk, etc...)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="height"
              min={1}
              value={formData.height}
              onChange={handleChange}
              type="text"
              placeholder="Height (ft)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="weight"
              min={1}
              value={formData.weight}
              onChange={handleChange}
              type="number"
              placeholder="Weight (kg)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              type="text"
              placeholder="Dietary Preferences (Low Sugar, High Protien, etc..)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />
            <input
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              type="text"
              placeholder="Goals (Weight Gain/loss)"
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
            />

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-[308px] h-[54px] rounded-[10px] bg-[#DBDBDB] px-4 py-3 text-black"
              id=""
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="kannada">Kannada</option>
            </select>

            <div className="flex justify-around mt-4 ">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-[100px] h-[40px] bg-gray-300 text-black rounded-[100px] border border-black"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-[156px] h-[40px] bg-[#77FE77] text-[#272727] rounded-[100px] border border-black"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
