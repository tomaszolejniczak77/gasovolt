import { createContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isGasFormOpen, setIsGasFormOpen] = useState(false);
  const [isPowerFormOpen, setIsPowerFormOpen] = useState(false);

  return (
    <NavContext.Provider
      value={{
        isGasFormOpen,
        setIsGasFormOpen,
        isPowerFormOpen,
        setIsPowerFormOpen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
