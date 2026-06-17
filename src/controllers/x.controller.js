const X = require("../models/X");

const getAllXx = async (req, res) => {
  try {
    const xx = await X.find();
    res.json(xx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //TODO: Cambiar nombre de la función, mensaje de error y lo que corresponda a lo que se esté manejando.

const getXById = async (req, res) => {
  try {
    const x = await X.findById(req.params.id);
    if (!x) return res.status(404).json({ error: "" });
    res.json(x);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //TODO: Cambiar nombre de la función, mensaje de error y lo que corresponda a lo que se esté manejando.

const createX = async (req, res) => {
  try {
    const {a,b } = req.body;

    if (!a || b === undefined) {
      return res.status(400).json({ error: "" });
    }

    const x = await X.create(req.body);
    res.status(201).json(x);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //TODO: Cambiar nombre de la función, mensaje de error y lo que corresponda a lo que se esté manejando.

const updateX = async (req, res) => {
  try {
    const x = await X.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!x) return res.status(404).json({ error: "" }); // TODO: mensaje de error
    res.json(x);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //TODO: Cambiar nombre de la función, mensaje de error y lo que corresponda a lo que se esté manejando.

const deleteX = async (req, res) => {
  try {
    const x = await X.findByIdAndDelete(req.params.id);
    if (!x) return res.status(404).json({ error: "" });
    res.json({ message: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};//TODO: Cambiar nombre de la función, mensaje de error y lo que corresponda a lo que se esté manejando.

module.exports = { getAllXx, getXById, createX, updateX, deleteX }; 
//TODO: Cambiar nombre de las funciones exportadas y lo que corresponda a lo que se esté manejando.
