import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Electricity = () => {
  const { userId } = useContext(AuthContext);
  const {
    data: electricity,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["electricity", userId],
    queryFn: async () => {
      const response = await fetch(
        `https://gasovoltserver-production.up.railway.app/usage/electricity/${userId}`
      );
      return await response.json();
    },
  });

  if (isError) {
    return <p>Błąd pobierania</p>;
  }

  if (isPending) {
    return <p>Ładowanie danych - prąd...</p>;
  }

  const lastElectricityData = electricity.length - 1;

  return (
    <div>
      <h2>Prąd</h2>
      <p>
        Aktualne zużycie dla L1 <br /> z dnia{" "}
        {electricity[lastElectricityData]?.date} :{" "}
        <span>{electricity[lastElectricityData]?.L1_usage} kWh</span>
      </p>
      <p>
        Aktualne zużycie dla L2 <br /> z dnia{" "}
        {electricity[lastElectricityData]?.date} :{" "}
        <span>{electricity[lastElectricityData]?.L2_usage} kWh</span>
      </p>
    </div>
  );
};

export default Electricity;
