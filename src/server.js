require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const xRoutes = require("./routes/x.routes"); // TODO: renombrar cuando se decida el nombre del recurso

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", xRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Algo ha ido mal" });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
