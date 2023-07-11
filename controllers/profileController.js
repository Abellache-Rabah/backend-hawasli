const { Comment } = require("../models/commentModel");
const { WorkerModel } = require("../models/workerModel");
const cloudinary = require("../utils/cloudinary");

const { UpdateWorkerSchema } = require("../utils/validation/joi");

module.exports.getProfile = async (req, res) => {
    try {
    const { idWorker } = req?.params?.id;
    if (!idWorker) return res.status(400).send("Id worker is require");
    const worker = await WorkerModel.findById(idWorker);
    if (!worker) return res.status(404).send("Worker dont exist!");
    const comment = await Comment.find({ idWorker });
    res.status(200).json({ worker, comment });
  } catch (error) {
    res.status(500).send(error);
  }
};




module.exports.deleteProfile = async (req, res) => {
  
  try {
          const email = req?.email;
    const user = await WorkerModel.findOneAndDelete({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(user);
    await cloudinary.api
      .delete_resources_by_prefix(`${user._id}/`)
      .catch(console.log(err));

    await user.save();
    return res.status(200).send("user deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.updateProfile = async (req, res) => {
  const { error } = UpdateWorkerSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const email = req?.email;
    const worker = await WorkerModel.findOneAndUpdate(
      { email },
      { $set: { ...req.body } },
      { new: true }
    );
    console.log(worker);
    res.status(200).send(worker);
  } catch (error) {
    res.status(500).send(error);
  }
};
