const router = require("express").Router();
const {
  getAllXx,
  getXById,
  createX,
  updateX,
  deleteX,
} = require("../controllers/product.controller"); // TODO: cambiar por el nombre real del controlador
const { isAuth, isAdmin } = require("../middlewares/auth");

router.get("/xx", getAllXx);
router.get("/xx/:id", getXById);

router.post("/xx", isAuth, isAdmin, createX);
router.put("/xx/:id", isAuth, isAdmin, updateX);
router.delete("/xx/:id", isAuth, isAdmin, deleteX);

module.exports = router;

//TODO: Cambiar "xx" por el nombre real del recurso en todas las rutas