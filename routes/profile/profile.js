const { Comment } = require("../../models/commentModel");
const { ConsummerModel } = require("../../models/consummerModel");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const { idWorker } = req.body;
  if (!idWorker) return res.status(400).send("Id worker is require");
  const worker = await WorkerModel.findById(idWorker);
  if (!worker) return res.status(404).send("Worker dont exist!");
  const comment = await Comment.find({ idWorker });
  res.status(200).json({ worker, comment });
});
