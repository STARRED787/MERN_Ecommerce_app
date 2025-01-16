const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  clud_name: "dyphvszup",
  api_key: "774861489475243",
  api_secret: "uHLqfc_e_mCgB5O_E91tiRBCCuU",
});

const storage = new multer.memoryStorage();

async function handleImageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
