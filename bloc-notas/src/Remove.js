const BotonEliminar = ({ onEliminar }) => {
  return (
    <button onClick={onEliminar} className="boton-eliminar">
      🗑️ Eliminar
    </button>
  );
};

export default BotonEliminar;
