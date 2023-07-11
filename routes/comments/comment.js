const comment = require("express").Router();
const { jwtverify } = require("../../middlewares/jwt");
const comments = require("../../controllers/commentsController")

comment.route("/:id?")
    .post(jwtverify , comments.createComment)
    .get(jwtverify , comments.getComments)


module.exports = comment;
