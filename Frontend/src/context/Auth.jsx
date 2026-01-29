import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

const getUserData = async (token) => {
  try {
    const result = await axios.post("http://localhost:8080/auth/getuser", {token} ,  {withCredentials:true}); 
    return result.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default function AuthContextComponent({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      (async () => {
        const user = await getUserData(token);
        setCurrentUser(user);
      })();
    }
  }, []);

  useEffect(() => {
    // console.log("Current User:", currentUser);
  }, [currentUser]);

  return (
    <UserAuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(UserAuthContext);
