
const Router = require("express").Router();
const { jwtverify } = require("../../middlewares/jwt");
const fileupload = require("express-fileupload");
Router.use(fileupload({ useTempFiles: true }));
const photo = require("../../controllers/uploadController")
Router.route("/")
    .get(jwtverify , photo.profile)
    .post(jwtverify, photo.photo )
    .delete(jwtverify, photo.deletePhoto)


module.exports = Router;
