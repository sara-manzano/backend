require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const moviesRoutes = require("./routes/movies.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", moviesRoutes);

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "El archivo no puede superar 2MB" });
    }
    return res.status(400).json({ error: "Error al subir el archivo" });
  }

  if (error.message === "Invalid file type") {
    return res.status(400).json({ error: "Formato de imagen no permitido. Usa jpg, jpeg, png o webp" });
  }

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: "ID no válido" });
  }

  res.status(500).json({ error: "Algo ha ido mal" });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
