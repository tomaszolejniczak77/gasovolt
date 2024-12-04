import { createContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isGasFormOpen, setIsGasFormOpen] = useState(false);
  const [isPowerFormOpen, setIsPowerFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  return (
    <NavContext.Provider
      value={{
        isGasFormOpen,
        setIsGasFormOpen,
        isPowerFormOpen,
        setIsPowerFormOpen,
        isLoginFormOpen,
        setIsLoginFormOpen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
