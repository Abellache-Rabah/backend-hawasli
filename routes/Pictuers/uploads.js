const Router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
const { uploadDirect } = require("@uploadcare/upload-client");
const fileUpload = require("express-fileupload");

const { storage } = require("./fireBase");
const { doc, updateDoc } = require("firebase/firestore");
const { ref,getDownloadURL, uploadBytes } = require("firebase/storage");
Router.use(fileUpload());

async function upload(e) {
  const file = e;
  const storageRef = ref(storage, `users/12345678/profile.png`);
  const result = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(result.ref);
  return url;
  // await updateDoc(doc(db, "users", $user?.uid), { photoURL: url });
}

Router.post("/profile", jwtverify, async (req, res) => {
  const fileData = req.files.profile.data;
  const result = await upload(fileData);
  console.log(result);
  res.send(result);
});

module.exports = Router;
