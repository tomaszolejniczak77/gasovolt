import React from "react";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { useMutation } from "@tanstack/react-query";
import { useUrls } from "../../context/UrlContext";

const RegisterForm = ({ login, setLogin, password, setPassword }) => {
  const { setIsLoginFormOpen, isLoginFormOpen } = useContext(NavContext);

  const { baseUrl } = useUrls();

  const registerUser = async (user) => {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Rejestracja nie powiodła się!");
    }

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Rejestracja zakończona sukcesem. Zaloguj się!");
    },
    onError: (error) => {
      console.error("Error user register:", error.message);
      alert(error.message);
    },
  });

  function hadleLogIn(e) {
    e.preventDefault();
    mutate({ login: login, password: password });
    setIsLoginFormOpen(!isLoginFormOpen);
  }

  return (
    <>
      <div className="loginWrapper">
        <div id="closeBtn">
          <button onClick={() => setIsLoginFormOpen(false)}>X</button>
        </div>

        <h2>Rejestracja</h2>

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
            Zarejestruj
          </button>
        </form>
        {/* pusty elemet dla zachowanie identycznego układu Login i Register */}
        <p></p>
      </div>
    </>
  );
};

export default RegisterForm;
