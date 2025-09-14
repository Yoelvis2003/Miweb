import React, { useState } from "react";
import Nota from "./Notas";
import "./Add.css";

function Add({ notas, setNotas, editarNota, eliminarNota }) {
  const [nota, setNota] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (nota.trim() === "") return;

    try {
      const res = await fetch("http://localhost:3000/notas/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: nota }),
      });

      const nuevaNota = await res.json();
      setNotas([...notas, nuevaNota]);
      setNota("");
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Agrega una nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="lista-notas">
        {notas.map((nota) => (
          <Nota
            key={nota.id}
            nota={nota}
            onEditar={editarNota}
            onEliminar={eliminarNota}
          />
        ))}
      </div>
    </div>
  );
}

export default Add;
