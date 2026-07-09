require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const ADMIN_DATA = {
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin",
};

const connectDB = () => mongoose.connect(process.env.MONGODB_URI);

const createAdmin = async () => {
  const { name, email, password, role } = ADMIN_DATA;

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed:admin] El usuario admin ya existe → ${email}`);
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({ name, email, password: hashedPassword, role });

  return { admin, plainPassword: password };
};

const run = async () => {
  try {
    await connectDB();
    console.log("[seed:admin] Conectado a MongoDB");

    const result = await createAdmin();

    if (result) {
      const { admin, plainPassword } = result;
      console.log("[seed:admin] Admin creado correctamente");
      console.log(`  _id:      ${admin._id}`);
      console.log(`  Email:    ${admin.email}`);
      console.log(`  Password: ${plainPassword}`);
    }
  } catch (error) {
    console.error("[seed:admin] Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("[seed:admin] Desconectado de MongoDB");
  }
};

run();
