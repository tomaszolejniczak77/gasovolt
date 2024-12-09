import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token") || null
  );

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`http://192.168.1.225:8000/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
      } else {
        logout(); // Jeśli refresh token nie działa, wyloguj
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 14 * 60 * 1000); // Co 14 minut

      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("LoggedIn");
    if (loginStatus) setIsLoggedIn(loginStatus);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isRegistered,
          setIsRegistered,
          accessToken,
          setAccessToken,
          setRefreshToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
