import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export default function AuthContextComponent({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/getuser",
        {},
        { withCredentials: true }
      );
      setCurrentUser(res.data.user);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser(); // 🔥 runs when app starts
  }, []);

  return (
    <UserAuthContext.Provider value={{ currentUser, setCurrentUser, loadUser, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(UserAuthContext);
