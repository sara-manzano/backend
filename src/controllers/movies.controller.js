const Movie = require("../models/movies");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "ID no válido" });
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "ID no válido" });
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "ID no válido" });
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
