import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useUrls } from "../../../context/UrlContext";

const Gas = () => {
  const { accessToken } = useContext(AuthContext);

  const { baseUrl, usageGasEndpoint } = useUrls();

  const { data, isPending, isError } = useQuery({
    queryKey: ["gas", accessToken],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/${usageGasEndpoint}`, {
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
    return <p>Ładowanie danych - gaz...</p>;
  }

  const gas = data.gas_usage;

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
