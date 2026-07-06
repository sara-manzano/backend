const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { cloudinary } = require("../config/cloudinary");

const VALID_ROLES = ["user", "admin"];

const withoutPassword = (mongooseDoc) => {
  const { password, ...rest } = mongooseDoc.toObject();
  return rest;
};

const updateFavorites = (userId, operation) =>
  User.findByIdAndUpdate(userId, operation, { new: true })
    .select("-password")
    .populate("favorite_movies");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const missingFields = ["name", "email", "password"].filter((f) => !req.body[f]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Faltan los siguientes campos: ${missingFields.join(", ")}` });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.file?.path,
      imagePublicId: req.file?.filename,
    });

    res.status(201).json(withoutPassword(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ese email ya está registrado" });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) return res.status(401).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({ token, user: withoutPassword(user) });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("favorite_movies");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isOwner = req.user._id.toString() === id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "No tienes permiso para editar esta cuenta" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    if (req.file) {
      if (user.imagePublicId) {
        await cloudinary.uploader.destroy(user.imagePublicId);
      }
      user.image = req.file.path;
      user.imagePublicId = req.file.filename;
    }

    await user.save();
    res.json(withoutPassword(user));
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: "El rol debe ser 'user' o 'admin'" });
    }

    const isChangingOwnRole = req.user._id.toString() === req.params.id;
    if (isChangingOwnRole) {
      return res.status(403).json({ error: "No puedes cambiar tu propio rol" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const user = await updateFavorites(req.user._id, { $addToSet: { favorite_movies: req.params.idData } });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const user = await updateFavorites(req.user._id, { $pull: { favorite_movies: req.params.idData } });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeletingOwnAccount = req.user._id.toString() === id;
    const isAdmin = req.user.role === "admin";

    if (!isDeletingOwnAccount && !isAdmin) {
      return res.status(403).json({ error: "No tienes permiso para borrar esta cuenta" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if (user.imagePublicId) {
      await cloudinary.uploader.destroy(user.imagePublicId);
    }

    await user.deleteOne();
    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, updateUser, updateRole, addFavorite, removeFavorite, deleteUser };

