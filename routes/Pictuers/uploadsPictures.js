const Router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { jwtverify, isWorker } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
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
    const nameFile = `${Date.now()}${path.extname(file.originalname)}`;
    if (worker && worker.photos.length < 5) {
      worker.photos.push(nameFile);
      await worker.save();
      return cb(null, nameFile);
    } else {
      return cb("you ritchd the limited");
    }
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
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});

Router.post(
  "/uploadPicture",
  jwtverify,
  isWorker,
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
