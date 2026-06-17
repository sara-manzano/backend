const mongoose = require("mongoose");

const xSchema = new mongoose.Schema(
  {
    //TODO
  },
  { timestamps: true }
);

const X = mongoose.model("X", xSchema); // TODO: Cambiar "X" por el nombre real del modelo

module.exports = X; // TODO: Cambiar X por el nombre real del modelo
