const { upload } = require("../config/cloudinary");

const uploadImage = upload.single("image");

module.exports = { uploadImage };
