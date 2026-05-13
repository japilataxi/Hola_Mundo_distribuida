const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

const client = new Client({
  host: "db",
  user: "user",
  password: "password",
  database: "hola_db",
  port: 5432
});

setTimeout(() => {
  client.connect()
    .then(() => console.log("Conectado a PostgreSQL ✅"))
    .catch(err => console.error("Error conexión DB:", err));
}, 5000);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/api/hola", async (req, res) => {
  try {

    // crear tabla
    await client.query(`
      CREATE TABLE IF NOT EXISTS mensaje (
        id SERIAL PRIMARY KEY,
        texto TEXT
      )
    `);

    // insertar mensajes
    await client.query(`
      INSERT INTO mensaje (texto)
      VALUES 
      ('Hola desde Node.js 🚀'),
      ('Hola profe 😎'),
      ('Proyecto Fullstack funcionando 🔥')
    `);

    // obtener mensajes
    const result = await client.query("SELECT texto FROM mensaje LIMIT 1");

    res.json({ mensaje: result.rows[0].texto });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});