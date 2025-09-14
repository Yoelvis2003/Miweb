import { useEffect, useState } from "react";
import Add from "./Add";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]);

  const editarNota = async (nota) => {
    const nuevoTexto = prompt("Editar nota:", nota.nota);
    if (!nuevoTexto || nuevoTexto.trim() === "") return;

    try {
      const res = await fetch(`http://localhost:3000/notas/put/${nota.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: nuevoTexto }),
      });

      const notaActualizada = await res.json();
      setNotas(notas.map((n) => (n.id === nota.id ? notaActualizada : n)));
    } catch (error) {
      console.error("Error al editar la nota:", error);
    }
  };

  const eliminarNota = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta nota?"
    );
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:3000/notas/delete/${id}`, {
        method: "DELETE",
      });

      setNotas(notas.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await fetch("http://localhost:3000/notas");
        const data = await res.json();
        setNotas(data);
      } catch (error) {
        console.error("Error al cargar las notas:", error);
      }
    };

    fetchNotas();
  }, []);

  return (
    <div className="lista-notas">
      <h1>Notas</h1>
      <Add
        notas={notas}
        setNotas={setNotas}
        editarNota={editarNota}
        eliminarNota={eliminarNota}
      />
    </div>
  );
}

export default App;
