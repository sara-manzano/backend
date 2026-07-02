const Movie = require("../models/movies");

const isInvalidId = (error) => error.name === "CastError";

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    if (isInvalidId(error)) return res.status(400).json({ error: "ID no válido" });
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    if (isInvalidId(error)) return res.status(400).json({ error: "ID no válido" });
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    if (isInvalidId(error)) return res.status(400).json({ error: "ID no válido" });
    next(error);
  }
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
