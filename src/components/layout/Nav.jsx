import React from "react";
import { GiGasStove } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { FiLogIn } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Nav.module.css";

const Nav = () => {
  const {
    isGasFormOpen,
    setIsGasFormOpen,
    isPowerFormOpen,
    setIsPowerFormOpen,
    isLoginFormOpen,
    setIsLoginFormOpen,
  } = useContext(NavContext);

  const { isLoggedIn, setIsRegistered } = useContext(AuthContext);

  const icons = [
    { name: "power", component: <ImPower size={30} color="#FF9933" /> },
    { name: "gas", component: <GiGasStove size={30} color="#1e90ff" /> },
    {
      name: "login",
      component: (
        <FiLogIn size={30} color={!isLoggedIn ? "#FFFFFF" : "#1eff22"} />
      ),
    },
  ];

  const handleIconClick = (iconName) => {
    if (iconName === "gas") {
      setIsGasFormOpen(!isGasFormOpen);
      setIsPowerFormOpen(false);
    } else if (iconName === "power") {
      setIsPowerFormOpen(!isPowerFormOpen);
      setIsGasFormOpen(false);
    } else {
      setIsLoginFormOpen(!isLoginFormOpen);
      setIsRegistered(true);
    }
  };

  return (
    <div className={styles.nav}>
      <h1>GasoVolt®</h1>
      {icons.map((icon) => (
        <button key={icon.name} onClick={() => handleIconClick(icon.name)}>
          {icon.component}
        </button>
      ))}
    </div>
  );
};

export default Nav;
