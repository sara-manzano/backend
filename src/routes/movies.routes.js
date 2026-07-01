const router = require("express").Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");
const { isAuth, isAdmin } = require("../middlewares/auth");

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);

router.post("/movies", isAuth, isAdmin, createMovie);
router.put("/movies/:id", isAuth, isAdmin, updateMovie);
router.delete("/movies/:id", isAuth, isAdmin, deleteMovie);

module.exports = router;