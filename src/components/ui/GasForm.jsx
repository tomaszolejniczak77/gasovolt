import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import DeleteLastGasInput from "./DeleteLastGasInput";
const URL = "https://gasovoltserver-production.up.railway.app/usage/gas";

const GasForm = () => {
  const [gasUsage, setGasUsage] = useState("");
  const [gasInputDate, setGasInputDate] = useState("");

  const { setIsGasFormOpen } = useContext(NavContext);

  const { userId } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const addGasUsage = async (usage) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usage),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: addGasUsage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gas"] });
      setGasUsage("");
      setGasInputDate("");
      setIsGasFormOpen(false);
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });

  function handleSumbit(e) {
    e.preventDefault();
    mutate({ user_id: userId, date: gasInputDate, usage: +gasUsage });
  }

  return (
    <>
      <h2>Wprowadź aktualne zużycie gazu</h2>

      <form onSubmit={handleSumbit}>
        <input
          value={gasInputDate}
          type="date"
          name="date"
          required
          onChange={(e) => setGasInputDate(e.target.value)}
        />
        <input
          type="text"
          name="gasInput"
          required
          value={gasUsage}
          placeholder="Podaj zużycie w m³"
          onChange={(e) => setGasUsage(e.target.value)}
        />
        <button type="submit">Zapisz dane</button>
      </form>
      <div className="buttons">
        <DeleteLastGasInput />
        <button id="close" onClick={() => setIsGasFormOpen(false)}>
          Zamknij
        </button>
      </div>
    </>
  );
};

export default GasForm;
