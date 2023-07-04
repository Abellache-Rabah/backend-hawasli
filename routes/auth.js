const Roater = require("express").Router();
const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const { TokenModel } = require("../models/tokenModels");
const createAccessToken = (email) => {
  return jwt.sign({ email }, process.env.K);
};
Roater.post("/login", async (req, res) => {
  if (!req.body?.email || !req.body?.password)
    return res.status(401).send({ message: "error authent" });
  const { email, password } = req.body;
  const token = createAccessToken(email);
  const worker = await WorkerModel.findOne({ email, password });
  const consummer = await ConsummerModel.findOne({ email, password });
  if (!worker && !consummer)
    return res.status(401).send({ message: "user does not exist" });
  const newtoken = new TokenModel({
    userId: worker?._id || consummer?._id,
    token,
  });
  await newtoken.save();
  console.log(token);
  res.json({ token });
});




module.exports = Roater;
