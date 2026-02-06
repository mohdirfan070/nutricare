import { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth";
import EditableField from "./EditableField";
import axios from "axios";

function ProfileDetails({ onBack }) {
  const { currentUser: user, setCurrentUser } = useAuthContext();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/user/update",
        formData,
        { withCredentials: true },
      );

      setCurrentUser(res.data.user); // 🔥 refresh app user
      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="w-[85%] mt-[6%] flex-1 overflow-y-auto scroll-smooth pr-2 space-y-[3%] text-gray-800">
        <button
          onClick={onBack}
          className="text-green-700 text-lg font-medium mb-2"
        >
          ← Back
        </button>

        <EditableField
          label="Name"
          name="name"
          value={formData.name}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Email"
          name="email"
          value={formData.email}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Age"
          name="age"
          value={formData.age}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Gender"
          name="gender"
          value={formData.gender}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Height"
          name="height"
          value={formData.height}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Weight"
          name="weight"
          value={formData.weight}
          editMode={editMode}
          onChange={handleChange}
        />
        <EditableField
          label="Goals"
          name="goals"
          value={formData.goals}
          editMode={editMode}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-[#79c66e] text-xl px-6 py-2 rounded-full font-medium"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-200 text-xl px-6 py-2 rounded-full font-medium"
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}

export default ProfileDetails;

function Info({ label, value }) {
  return (
    <div className="bg-[#F4F4F4] rounded-xl px-4 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
