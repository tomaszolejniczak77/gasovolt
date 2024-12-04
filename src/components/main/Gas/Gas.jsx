import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Gas = () => {
  const { userId } = useContext(AuthContext);

  const {
    data: gas,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["gas", userId],
    queryFn: async () => {
      const response = await fetch(
        `https://gasovoltserver-production.up.railway.app/usage/gas/${userId}`
      );
      return await response.json();
    },
  });

  if (isError) {
    return <p>Błąd pobierania</p>;
  }

  if (isPending) {
    return <p>Ładowanie danych - gaz...</p>;
  }

  const lastGasData = gas.length - 1;

  return (
    <div>
      <h2>Gaz</h2>
      <p>
        Aktualne zużycie gazu <br /> z dnia {gas[lastGasData]?.date} :{" "}
        <span>{gas[lastGasData]?.usage} m³</span>
      </p>
    </div>
  );
};

export default Gas;
