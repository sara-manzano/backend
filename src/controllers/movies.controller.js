const Movie = require("../models/movies");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const getAllMovies = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || DEFAULT_PAGE, 1);
    const limit = Math.min(parseInt(req.query.limit) || DEFAULT_LIMIT, 100);
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      Movie.find().skip(skip).limit(limit),
      Movie.countDocuments(),
    ]);

    res.json({ data: movies, page, limit, total, pages: Math.ceil(total / limit) });
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
    next(error);
  }
};

const ALLOWED_FIELDS = [
  "plot", "fullplot", "genres", "runtime", "cast",
  "num_mflix_comments", "poster", "title", "lastupdated",
  "languages", "released", "directors", "writers", "awards",
  "year", "imdb", "countries", "type", "tomatoes",
];

const pickFields = (body) =>
  ALLOWED_FIELDS.reduce((acc, key) => {
    if (key in body) acc[key] = body[key];
    return acc;
  }, {});

const createMovie = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const movie = await Movie.create(pickFields(req.body));
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    if (req.body.title !== undefined && !req.body.title) {
      return res.status(400).json({ error: "El título no puede estar vacío" });
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
