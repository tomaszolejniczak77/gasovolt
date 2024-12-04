import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    const loginStatus = localStorage.getItem("LoggedIn");
    if (storedId) setUserId(storedId);
    if (loginStatus) setIsLoggedIn(loginStatus);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          userId,
          setUserId,
          isLoggedIn,
          setIsLoggedIn,
          isRegistered,
          setIsRegistered,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
