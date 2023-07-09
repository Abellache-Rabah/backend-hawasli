const Router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
const { uploadDirect } = require("@uploadcare/upload-client");
const fileUpload = require("express-fileupload");
Router.use(fileUpload());

Router.post("/profile", jwtverify, async (req, res) => {
  const fileData = req.files.profile.data;

  const result = await uploadDirect(fileData, {
    publicKey: process.env.PUBLICKEY,
    store: "auto",
  });

  console.log(result);
  res.send(result);
});

module.exports = Router;
