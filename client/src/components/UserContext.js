import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize user data from localStorage or empty strings
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") || ""
  );

  const [coordinates, setCoordinates] = useState(
    localStorage.getItem("cordinates") || null
  );

  // Save user data to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", userName);
      localStorage.setItem("theme", isDarkMode);
      localStorage.setItem("cordinates", coordinates);
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [userEmail, userName, isDarkMode, coordinates]);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        isDarkMode,
        setIsDarkMode,
        coordinates,
        setCoordinates,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
