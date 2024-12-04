import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./DeleteLastInput.module.css";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";

const DeleteLastGasInput = () => {
  const queryClient = useQueryClient();
  const { setIsGasFormOpen } = useContext(NavContext);
  const { userId } = useContext(AuthContext);

  const deleteItem = async () => {
    const response = await fetch(
      `https://gasovoltserver-production.up.railway.app/delete_last/gas_usage/${userId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Błąd podczas usuwania elementu");
    }
  };

  const mutation = useMutation({
    mutationFn: () => deleteItem(),
    onSuccess: () => {
      // Odśwież dane po usunięciu elementu
      queryClient.invalidateQueries(["gas"]);
      setIsGasFormOpen(false);
    },
    onError: (error) => {
      alert(`Błąd: ${error.message}`);
    },
  });

  function handleDelete() {
    confirmAlert({
      title: "Potwierdzenie",
      message: `Czy na pewno chcesz usunąć ostatni wpis w bazie?`,
      buttons: [
        {
          label: "Tak",
          onClick: () => mutation.mutate(),
        },
        {
          label: "Nie",
          onClick: () => setIsGasFormOpen(false),
        },
      ],
      overlayClassName: styles.overlay,
    });
  }

  return <button onClick={handleDelete}>Usuń ostatni wpis</button>;
};

export default DeleteLastGasInput;
