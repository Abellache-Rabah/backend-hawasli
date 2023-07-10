const { jwtverify } = require("../../middlewares/jwt");
const profile = require("../../controllers/profileController");
const router = require("express").Router();
router
  .route("/:id?")
  .get(profile.getProfile)
  .delete(jwtverify, profile.getProfile)
  .put(jwtverify, profile.updateProfile);
module.exports = router;
