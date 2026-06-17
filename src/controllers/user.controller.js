const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { cloudinary } = require("../config/cloudinary");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
      image: req.file?.path,
    });

    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ese email ya está registrado" });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.password = undefined;
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("favorites");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "El rol debe ser 'user' o 'admin'" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    // $addToSet evita duplicados automáticamente
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: req.params.idData } },
      { new: true }
    ).select("-password").populate("favorites");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: req.params.idData } },
      { new: true }
    ).select("-password").populate("favorites");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const esMiCuenta = req.user._id.toString() === id;
    const esAdmin = req.user.role === "admin";

    if (!esMiCuenta && !esAdmin) {
      return res.status(403).json({ error: "No tienes permiso para borrar esta cuenta" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // si tiene imagen la borramos también de cloudinary
    if (user.image) {
      const publicId = "backend-users/" + user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "Cuenta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getProfile, updateRole, addFavorite, removeFavorite, deleteUser };
