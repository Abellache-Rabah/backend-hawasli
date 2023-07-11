const { Comment } = require("../models/commentModel");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const { CommentSchema } = require("../utils/validation/joi");

module.exports.createComment= async (req, res) => {
  try {
    const { error } = CommentSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  const { content, rating, idWorker } = req.body;
  const userComment = req?.email;
  const userWhoCommented = await ConsummerModel.find({ email: userComment });
  if (!userWhoCommented) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  if (!content || !rating || !idWorker) {
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
  } catch (error) {
     
    res.status(500).send(error)
  }
};

module.exports.getComments =  async (req, res) => {
  try {
  const idWorker = req.params?.id;
  if (idWorker.length != 24) res.status(403).json("id not correct")
  const workers = await WorkerModel.findById(idWorker);
  if (!workers) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  const comments = await Comment.find({ idWorker });
  if (!comments) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json(error)
  }
};

