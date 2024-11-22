import { useQuery } from "@tanstack/react-query";
import { gasQueryOptions } from "../../../queries/gasQueryOpitions";

const Gas = () => {
  const { data: gas, isPending, isError } = useQuery(gasQueryOptions);

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
        Aktualne zużycie gazu <br /> z dnia {gas[lastGasData].date} :{" "}
        <span>{gas[lastGasData].usage} m³</span>
      </p>
    </div>
  );
};

export default Gas;
