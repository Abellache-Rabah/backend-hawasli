const Router = require("express").Router();
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
const fileupload = require("express-fileupload");
const cloudinary = require("../../utils/cloudinary");
Router.use(fileupload({ useTempFiles: true }));

Router.post("/profile", jwtverify, async (req, res) => {
  const file = req.files.image;
  const email = req?.email
  try {
    const user = await WorkerModel.findOne({ email }) || await ConsummerModel.findOne({ email}) ;
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: "profile",
      resource_type: "auto",
      folder: `${user._id}`,
      width: 300,
      crop: "scale"
    });
    user.picture = result.secure_url;
    await user.save();
    res.json({
      message : "uploaded seccesfully",
      url: result.secure_url,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});




Router.post("/photo", jwtverify, async (req, res) => {
  const file = req.files.image;
  const email = req?.email
  try {
    const user = await WorkerModel.findOne({ email }) ;
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}_1`,
      resource_type: "auto",
      folder: `${user._id}`,
    });
    user.photos.push(result.secure_url) 
    await user.save();
    res.json({
      message : "uploaded seccesfully",
      url: result.secure_url,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});

module.exports = Router;
