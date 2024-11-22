import React from "react";
import { GiGasStove } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import styles from "./Nav.module.css";

const Nav = () => {
  const icons = [
    { name: "power", component: <ImPower size={30} color="#FF9933" /> },
    { name: "gas", component: <GiGasStove size={30} color="#1e90ff" /> },
  ];

  const {
    isGasFormOpen,
    setIsGasFormOpen,
    isPowerFormOpen,
    setIsPowerFormOpen,
  } = useContext(NavContext);

  const handleIconClick = (iconName) => {
    if (iconName === "gas") {
      setIsGasFormOpen(!isGasFormOpen);
      setIsPowerFormOpen(false);
    } else {
      setIsPowerFormOpen(!isPowerFormOpen);
      setIsGasFormOpen(false);
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
