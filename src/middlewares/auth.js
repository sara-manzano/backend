const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Necesitas estar logueado" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload._id).select("-password");
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Solo los admins pueden hacer esto" });
  }
  next();
};

module.exports = { isAuth, isAdmin };
