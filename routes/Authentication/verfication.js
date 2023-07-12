const verficationRoute = require("express").Router();
const verficationController = require("../../controllers/verficationController");

verficationRoute.route("/:token")
      .get(verficationController.getVerfaid)



module.exports = verficationRoute;
