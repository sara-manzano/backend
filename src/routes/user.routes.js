const router = require("express").Router();
const {
  register,
  login,
  getAllUsers,
  getProfile,
  updateUser,
  updateRole,
  addFavorite,
  removeFavorite,
  deleteUser,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/file");

router.post("/register", uploadImage, register);
router.post("/login", login);

router.get("/users", isAuth, isAdmin, getAllUsers);
router.get("/users/profile", isAuth, getProfile);
router.put("/users/add-favorite/:idData", isAuth, addFavorite);
router.put("/users/:id", isAuth, uploadImage, updateUser);
router.delete("/users/remove-favorite/:idData", isAuth, removeFavorite);
router.delete("/users/:id", isAuth, deleteUser);

router.put("/users/:id/role", isAuth, isAdmin, updateRole);

module.exports = router;
