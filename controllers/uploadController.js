const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const cloudinary = require("../utils/cloudinary");

module.exports.profile= async (req, res) => {
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
      height: 300,
      crop: 'fill'
    });
    var resultPictureUrl  = result.secure_url;
    var squarePicture = "c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/";
    var position = 50;
    //insert square picture parameter to the url
    var output = [resultPictureUrl.slice(0, position), squarePicture, resultPictureUrl.slice(position)].join('');

    user.picture = output;
    await user.save();
    res.json({
      message: "uploaded seccesfully",
      url: output,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
};

module.exports.photo= async (req, res) => {
  const file = req.files.image;
  const email = req?.email;
  try {
    const user = await WorkerModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.photos.url.length > 4)  {
      return res.status(400).send( "you reached the maximum number of photos")
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: `${user._id}`,
    });
    user.photos.url.push(result.secure_url);
    user.photos.name.push(result.public_id);
    await user.save();
    res.status(200).json({
      message: "uploaded seccesfully",
      url: result.secure_url,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
};

module.exports.deletePhoto = async (req, res) => {
  const name = req.body?.name;
  const email = req?.email;
  if (!name) {
    res.status(400).send("Please enter a photo name")
  }
  try {
    const workers = await WorkerModel.findOne({ email });
    if (!workers) {
      return res
        .status(400)
        .json({ error: "User not found or photo dosnt exist" });
    }
    await cloudinary.uploader.destroy(name, {
      folder: `${workers._id}`,
    });
    workers.photos.name = workers.photos.name.filter((e) => e != name);
    workers.photos.url = workers.photos.url.filter((e) => !e.includes(name));
    await workers.save();
    res.status(200).json({
      message: "photo deleted",
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
};

