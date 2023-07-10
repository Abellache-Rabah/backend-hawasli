const { Comment } = require("../../models/commentModel");
const { jwtverify } = require("../../middlewares/jwt");
const { WorkerModel } = require("../../models/workerModel");
const cloudinary = require("../../utils/cloudinary");

const router = require("express").Router();
router.get("/:id", async (req, res) => {
  try {
    const { idWorker } = req.params.id;
    if (!idWorker) return res.status(400).send("Id worker is require");
    const worker = await WorkerModel.findById(idWorker);
    if (!worker) return res.status(404).send("Worker dont exist!");
    const comment = await Comment.find({ idWorker });
    res.status(200).json({ worker, comment });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete", jwtverify, async (req, res) => {
  const email = req?.email;

  try {
    const user = await WorkerModel.findOneAndDelete({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    await cloudinary.api
      .delete_folder(`/${user._id}`)
      .then(await user.delete());
    return res.status(200).send("user deleted");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
