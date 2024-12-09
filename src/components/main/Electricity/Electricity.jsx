import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useUrls } from "../../../context/UrlContext";

const Electricity = () => {
  const { accessToken } = useContext(AuthContext);
  const { baseUrl, usageElectricityEndpoint } = useUrls();

  const { data, isPending, isError } = useQuery({
    queryKey: ["electricity", accessToken],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/${usageElectricityEndpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Dodaj token JWT do nagłówka
        },
      });
      return await response.json();
    },
    enabled: !!accessToken,
  });

  if (!accessToken) {
    return <p>Musisz się zalogować, aby zobaczyć dane.</p>;
  }

  if (isError) {
    return <p>Błąd pobierania</p>;
  }

  if (isPending) {
    return <p>Ładowanie danych - prąd...</p>;
  }

  const electricity = data.electricity_usage;

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
