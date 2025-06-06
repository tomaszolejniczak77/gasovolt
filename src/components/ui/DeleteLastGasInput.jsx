import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./DeleteLastInput.module.css";
import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import { useUrls } from "../../context/UrlContext";

const DeleteLastGasInput = () => {
  const queryClient = useQueryClient();
  const { setIsGasFormOpen } = useContext(NavContext);
  const { accessToken } = useContext(AuthContext);
  const { baseUrl, deleteLastGasEndpoint } = useUrls();

  const deleteItem = async () => {
    const response = await fetch(`${baseUrl}/${deleteLastGasEndpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Błąd podczas usuwania elementu");
    }
  };

  const mutation = useMutation({
    mutationFn: () => deleteItem(),
    onSuccess: () => {
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
