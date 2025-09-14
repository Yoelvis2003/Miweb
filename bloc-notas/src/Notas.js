import React, { useState } from "react";
import BotonEditar from "./Update";
import BotonEliminar from "./Remove";
import "./Notas.css";

const Nota = ({ nota, onEditar, onEliminar }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  return (
    <div className="nota-container">
      <div onClick={toggleOpciones} className="nota-texto">
        {nota.nota}
      </div>

      {mostrarOpciones && (
        <div className="opciones-dropdown">
          <BotonEditar onEditar={() => onEditar(nota)} />
          <BotonEliminar onEliminar={() => onEliminar(nota.id)} />
        </div>
      )}
    </div>
  );
};

export default Nota;
