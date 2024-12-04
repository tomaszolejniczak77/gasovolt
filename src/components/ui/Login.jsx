import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { isRegistered } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      {isRegistered ? (
        <LoginForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <RegisterForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
        />
      )}
    </>
  );
};

export default Login;
