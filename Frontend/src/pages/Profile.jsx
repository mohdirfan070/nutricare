import React from "react";
import { useAuthContext } from "../context/Auth";

export default function Profile() {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  

  return (
    <div className="w-[90%] mx-auto  bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Hi, <span className="text-green-600">{currentUser.name}</span>
      </h1>

      {/* User Info */}
      <div className="space-y-3 text-gray-700 ">
        <p>
          <span className="font-medium">Age:</span> {currentUser.age || "N/A"}
        </p>
        <p>
          <span className="font-medium">Gender:</span>{" "}
          {currentUser.gender || "N/A"}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          {currentUser.email || "N/A"}
        </p>
        <p>
          <span className="font-medium">Allergies:</span>{" "}
          {currentUser.allergens?.map((ele) => ele) || "None"}
        </p>
        <p>
          <span className="font-medium">Diagnosis:</span>{" "}
          {currentUser.dietaryPreferences?.map((ele) => ele) || "N/A"}
        </p>
        <p>
          <span className="font-medium">Goals:</span>{" "}
          {currentUser.goals || "N/A"}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-8 gap-x-2 flex justify-center">
        <button className="px-6 py-2 bg-green-400 text-gray-900 font-medium rounded-lg shadow hover:bg-green-500 transition">
          Edit
        </button>
        <button className="px-6 py-2 bg-rose-600 text-gray-900 font-medium rounded-lg shadow hover:bg-red-500 transition">
          Logout
        </button>
      </div>
    </div>
  );
}
