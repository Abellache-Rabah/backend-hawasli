const Roater = require("express").Router();
const { jwtverify, isConsummer } = require("../../middlewares/jwt");
const authController = require("../../controllers/authController");

Roater.route("/login").post(authController.login);

Roater.route("/register")
  .post(authController.register)
  .put(isConsummer, authController.upgradeToWorker);

Roater.route("/logout").post( jwtverify,authController.logout);

module.exports = Roater;
