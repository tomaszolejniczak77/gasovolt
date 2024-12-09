import React from "react";
import { useContext, useState } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { IoIosPersonAdd } from "react-icons/io";
import { useUrls } from "../../context/UrlContext";

const LoginForm = ({ login, setLogin, password, setPassword }) => {
  const { setIsLoginFormOpen, isLoginFormOpen } = useContext(NavContext);

  const {
    isLoggedIn,
    setIsLoggedIn,
    setIsRegistered,
    setAccessToken,
    setRefreshToken,
  } = useContext(AuthContext);

  const { baseUrl } = useUrls();

  const loginUser = async (user) => {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logowanie nie powiodło się!");
    }

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("LoggedIn", true);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error("Error login user:", error.message);
      alert(error.message);
    },
  });

  function hadleLogIn(e) {
    e.preventDefault();
    mutate({ login: login, password: password });
    setIsLoginFormOpen(!isLoginFormOpen);
  }

  function handleLogOut() {
    setIsLoginFormOpen(!setIsLoginFormOpen);
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("LoggedIn");
    setAccessToken(null);
    setRefreshToken(null);
  }

  return (
    <>
      <div className="loginWrapper">
        <div id="closeBtn">
          <button onClick={() => setIsLoginFormOpen(false)}>X</button>
        </div>
        <h2>Logowanie</h2>
        {!isLoggedIn && (
          <form onSubmit={hadleLogIn}>
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button id="loginBtn" type="submit">
              Zaloguj
            </button>
          </form>
        )}
        {!isLoggedIn && (
          <p>
            Nie masz konta?
            <span>
              {" "}
              <button id="addBtn" onClick={() => setIsRegistered(false)}>
                <IoIosPersonAdd size={28} color="rgb(0, 96, 255)" />
              </button>
            </span>
          </p>
        )}
        {isLoggedIn && (
          <button id="logoutBtn" onClick={handleLogOut}>
            Wyloguj
          </button>
        )}
      </div>
    </>
  );
};

export default LoginForm;
