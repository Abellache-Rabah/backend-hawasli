const Router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { jwtverify } = require("../middlewares/jwt");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const email = req?.email;
    const worker = await WorkerModel.findOne({ email });
    const consummer = await ConsummerModel.findOne({ email });
    const id = consummer?._id || worker?._id;
    let path = `uploads/pictures/${id}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: async (req, file, cb) => {
    const email = req?.email;
    const worker = await WorkerModel.findOne({ email });
    const consummer = await ConsummerModel.findOne({ email });
    const nameFile = `profile${path.extname(file.originalname)}`;
    if (worker && !worker.picture) {
      worker.picture = nameFile;
      await worker.save();
    } else if (consummer && !consummer.picture) {
      consummer.picture = nameFile;
      await consummer.save();
    }
    return cb(null, nameFile);
  },
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

Router.post(
  "/uploadProfile",
  jwtverify,
  upload.single("profile"),
  (req, res) => {
    res.json({
      status: 200,
      message: "Profile Uploaded Successfully",
      url: `http://localhost:3000/uploads/profile/${req.file.filename}`,
    });
  }
);

module.exports = Router;
