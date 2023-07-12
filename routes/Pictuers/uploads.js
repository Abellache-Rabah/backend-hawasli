
const Router = require("express").Router();
const { jwtverify } = require("../../middlewares/jwt");
const fileupload = require("express-fileupload");
Router.use(fileupload({ useTempFiles: true }));
const photo = require("../../controllers/uploadController")
Router.route("/")
    .post(jwtverify, photo.photo )
    .delete(jwtverify, photo.deletePhoto)
Router.route("/profile")
    .post(jwtverify , photo.profile)

module.exports = Router;
