const express = require("express");
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.get("/notas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notas ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener las notas:", err);
    res.status(500).send("Error al obtener las notas");
  }
});

app.post("/notas/post", async (req, res) => {
  console.log("Recibido:", req.body);
  const { nota } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notas (nota) VALUES ($1) RETURNING *",
      [nota]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar la nota");
  }
});

app.put("/notas/put/:id", async (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;

  if (!nota || nota.trim() === "") {
    return res.status(400).send("La nota no puede estar vacía");
  }

  try {
    const result = await pool.query(
      "UPDATE notas SET nota = $1 WHERE id = $2 RETURNING *",
      [nota, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Nota no encontrada");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al editar la nota:", err);
    res.status(500).send("Error al editar la nota");
  }
});

app.delete("/notas/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM notas WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Nota no encontrada");
    }

    res.send("Nota eliminada correctamente");
  } catch (err) {
    console.error("Error al eliminar la nota:", err);
    res.status(500).send("Error al eliminar la nota");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de notas corriendo en http://localhost:${PORT}`);
});
