import React from "react";
import { useQuery } from "@tanstack/react-query";
import { electricityQueryOptions } from "../../../queries/electricityQueryOptions";

const Electricity = () => {
  const {
    data: electricity,
    isPending,
    isError,
  } = useQuery(electricityQueryOptions);

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
        {electricity[lastElectricityData].date} :{" "}
        <span>{electricity[lastElectricityData].L1_usage} kWh</span>
      </p>
      <p>
        Aktualne zużycie dla L2 <br /> z dnia{" "}
        {electricity[lastElectricityData].date} :{" "}
        <span>{electricity[lastElectricityData].L2_usage} kWh</span>
      </p>
    </div>
  );
};

export default Electricity;
