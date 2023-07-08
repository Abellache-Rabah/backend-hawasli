const comment = require("express").Router();
const jwt = require("jsonwebtoken");
const { Comment } = require("../../models/commentModel");
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");

comment.post("/", jwtverify, async (req, res) => {
  const { content, rating, idWorker } = req.body;
  const userComment = req?.email;
  const userWhoCommented = await ConsummerModel.find({ email: userComment });
  if (!userWhoCommented) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  if (!content || !rating || !idWorker ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const workers = await WorkerModel.findById(idWorker);
  if (!workers) {
    return res
      .status(400)
      .json({ message: "Something went wrong didnt find worker" });
  }

  const creteaComment = await Comment.create({
    ...req.body,
    idConsummer: userWhoCommented._id,
  });
  if (!creteaComment) {
    return res
      .status(400)
      .json({ message: "Something went wrong cant create a comment" });
  } else {
    const comments = await Comment.find({ idWorker });
    const somme = comments.reduce((a, b) => {
      return a + b.rating;
    }, 0);
    workers.rating = somme / comments.length;
    workers.save();
    return res.status(201).json({ message: "Comment created successfully" });
  }
});

comment.get("/:id", jwtverify, async (req, res) => {
  const idWorker = req.params.id;
  const workers = await WorkerModel.findById(idWorker);
  if (!workers) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  const comments = await Comment.find({ idWorker });
  if (!comments) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ comments });
});

module.exports = comment;
