import { createContext, useContext } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const urls = {
    // baseUrl: "https://gasovoltserver-production.up.railway.app",
    baseUrl: "http://192.168.1.225:5000",
    usageElectricityEndpoint: "usage/electricity",
    usageGasEndpoint: "usage/gas",
    deleteLastGasEndpoint: "delete_last/gas_usage",
    deleteLastElectricityEndpoint: "delete_last/electricity",
  };

  return <UrlContext.Provider value={urls}>{children}</UrlContext.Provider>;
};

export const useUrls = () => useContext(UrlContext);
