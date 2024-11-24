import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AiFillCloseSquare } from "react-icons/ai";
import DeleteLastGasInput from "./DeleteLastGasInput";
// const URL = "http://192.168.1.225:8000/usage/gas";

const URL_SERVER = "https://gasovoltserver-production.up.railway.app/usage/gas";

const GasForm = () => {
  const [gasUsage, setGasUsage] = useState("");
  const [gasInputDate, setGasInputDate] = useState("");

  const { setIsGasFormOpen } = useContext(NavContext);

  const queryClient = useQueryClient();

  const addGasUsage = async (usage) => {
    const response = await fetch(URL_SERVER, {
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
    mutate({ date: gasInputDate, usage: +gasUsage });
  }

  return (
    <>
      <h2>Wprowadź aktualne zużycie gazu</h2>
      <div className="closeBtn">
        <AiFillCloseSquare
          onClick={() => setIsGasFormOpen(false)}
          color="#1e90ff"
          size={26}
        />
      </div>

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
      <div className="deleteBtn">
        <DeleteLastGasInput />
      </div>
    </>
  );
};

export default GasForm;
