const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      sucess: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      sucess: false,
      message: "Image upload failed",
    });
  }
};

module.exports = { handleImageUpload };
