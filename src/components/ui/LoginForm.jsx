import React from "react";
import { useContext, useState } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { IoIosPersonAdd } from "react-icons/io";

const LoginForm = ({ login, setLogin, password, setPassword }) => {
  const URL = "https://gasovoltserver-production.up.railway.app/login";

  const { setIsLoginFormOpen, isLoginFormOpen } = useContext(NavContext);

  const {
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    isRegistered,
    setIsRegistered,
  } = useContext(AuthContext);

  const loginUser = async (user) => {
    const response = await fetch(URL, {
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
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("LoggedIn", true);
      setUserId(data.user_id);
      // alert("Logged in successfully!");
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
    setUserId(0);
    localStorage.removeItem("user_id");
    localStorage.removeItem("LoggedIn");
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
