import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import DeleteLastPowerInput from "./DeleteLastPowerInput";
import { useUrls } from "../../context/UrlContext";

const PowerForm = () => {
  const [powerUsageL1, setPowerUsageL1] = useState("");
  const [powerUsageL2, setPowerUsageL2] = useState("");
  const [powerInputDate, setPowerInputDate] = useState("");

  const { setIsPowerFormOpen } = useContext(NavContext);
  const { accessToken } = useContext(AuthContext);

  const { baseUrl, usageElectricityEndpoint } = useUrls();

  const queryClient = useQueryClient();

  const addPowerUsage = async (usage) => {
    const response = await fetch(`${baseUrl}/${usageElectricityEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Dodaj token JWT
      },
      body: JSON.stringify(usage),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: addPowerUsage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electricity"] });
      setPowerUsageL1("");
      setPowerUsageL2("");
      setIsPowerFormOpen(false);
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });

  function handleSumbit(e) {
    e.preventDefault();
    mutate({
      date: powerInputDate,
      L1_usage: +powerUsageL1,
      L2_usage: +powerUsageL2,
    });
  }

  return (
    <>
      <h2>Wprowadź aktualne zużycie prądu</h2>
      <form onSubmit={handleSumbit}>
        <input
          value={powerInputDate}
          type="date"
          name="date"
          required
          onChange={(e) => setPowerInputDate(e.target.value)}
        />
        <input
          type="text"
          name="gasInputL1"
          required
          value={powerUsageL1}
          placeholder="Podaj zużycie L1 w kWh"
          onChange={(e) => setPowerUsageL1(e.target.value)}
        />
        <input
          type="text"
          name="gasInputL2"
          required
          value={powerUsageL2}
          placeholder="Podaj zużycie L2 w kWh"
          onChange={(e) => setPowerUsageL2(e.target.value)}
        />
        <button type="submit">Zapisz dane</button>
      </form>
      <div className="buttons">
        <DeleteLastPowerInput />
        <button id="close" onClick={() => setIsPowerFormOpen(false)}>
          Zamknij
        </button>
      </div>
    </>
  );
};

export default PowerForm;
