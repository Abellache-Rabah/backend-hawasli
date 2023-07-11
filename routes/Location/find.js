const find = require("express").Router();
const findPeople = require("../../controllers/findController")

find.route("/").post(findPeople.root)

module.exports = find;
