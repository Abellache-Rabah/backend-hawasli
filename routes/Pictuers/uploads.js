const Router = require("express").Router();
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
const fileupload = require("express-fileupload");
const cloudinary = require("../../utils/cloudinary");
Router.use(fileupload({ useTempFiles: true }));

Router.post("/profile", jwtverify, async (req, res) => {
  const file = req.files.image;
  const email = req?.email;
  try {
    const user =
      (await WorkerModel.findOne({ email })) ||
      (await ConsummerModel.findOne({ email }));
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: "profile",
      resource_type: "auto",
      folder: `${user._id}`,
      width: 300,
      crop: "scale",
    });
    user.picture = result.secure_url;
    await user.save();
    res.json({
      message: "uploaded seccesfully",
      url: result.secure_url,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});

Router.post("/photo", jwtverify, async (req, res) => {
  const file = req.files.image;
  const email = req?.email;
  try {
    const user = await WorkerModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: `${user._id}`,
    });
    user.photos.url.push(result.secure_url);
    user.photos.name.push(result.public_id);
    await user.save();
    res.json({
      message: "uploaded seccesfully",
      url: result.secure_url,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});

Router.post("/deletePhoto", jwtverify, async (req, res) => {
  const name = req.body.name;
  const email = req?.email;
  try {
    const workers = await WorkerModel.findOne({ email });
    if (!workers) {
      return res
        .status(400)
        .json({ error: "User not found or photo dosnt exist" });
    }
    console.log(workers);

    await cloudinary.uploader.destroy(name, {
      folder: `${workers._id}`,
    });
    //TODO : remove from db

    workers.photos.name = workers.photos.name.filter((e) => e != name);
    workers.photos.url = workers.photos.url.filter(
      (e) => !e.includes(name)
    );
    await workers.save();
    res.json({
      message: "photo deleted",
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});

module.exports = Router;
