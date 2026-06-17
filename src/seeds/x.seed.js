require("dotenv").config();
const mongoose = require("mongoose");
const X = require("../models/x"); // TODO: cambiar por el nombre real del modelo

const data = [
  //TODO: añadir datos de prueba
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    await X.collection.drop().catch(() => null);

    await X.insertMany(data);
    console.log("Datos insertados correctamente"); // TODO: personalizar mensaje

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error en el seed:", error.message);
    process.exit(1);
  }
};

seed();
