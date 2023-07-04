const Roater = require("express").Router();
const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const { TokenModel } = require("../models/tokenModels");
const bcrypt = require("bcrypt");
const { jwtverify } = require("../middlewares/jwt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createAccessToken = (email) => {
  return jwt.sign({ email }, process.env.K);
};
Roater.post("/login", async (req, res) => {
  if (!req.body?.email || !req.body?.password)
    return res.status(401).send({ message: "error authent" });
  const { email, password } = req.body;
  const token = createAccessToken(email);

  const worker = await WorkerModel.findOne({
    email,
  });
  const consummer = await ConsummerModel.findOne({
    email,
  });
  const isAuth = comparePassword(
    password,
    worker.password || consummer.password
  );
  if (!isAuth) return res.status(401).send({ message: "user does not exist" });
  const newtoken = new TokenModel({
    userId: worker?._id || consummer?._id,
    token,
  });
  await newtoken.save();
  console.log(token);
  res.json({ token });
});

Roater.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(401).send({ message: "error authent" });

  const consummer = await ConsummerModel.findOne({ email });
  if (consummer) return res.status(401).send({ message: "user already exist" });
  const hashPwd = await hashPassword(password);
  const newConsummer = new ConsummerModel({
    firstName,
    lastName,
    email,
    password: hashPwd,
  });
  await newConsummer.save();
  const token = createAccessToken(email);
  const newToken = new TokenModel({
    userId: newConsummer?._id,
    token,
  });
  await newToken.save();
  res.status(200).json({ token });
});


Roater.post("/registerWorker", async (req, res) => {

  console.log(req.body.baladia);


  const { email, password, firstName, lastName ,sex,work,phone,age,wilaya,baladia} = req.body;
  if (!firstName || !lastName || !email || !password || !baladia || !sex || !work || !phone ||  !age || !wilaya )
    return res.status(401).send({ message: "error all fields should be present " });

  const worker = await WorkerModel.findOne({ email });
  if (worker) return res.status(401).send({ message: "user already exist" });
  const hashPwd = await hashPassword(password);
  const newWorker = new WorkerModel({
    firstName,
    lastName,
    email,
    password: hashPwd,
    sex,
    work,
    phone,
    age,
    wilaya,
  });
  await newWorker.save();
  const token = createAccessToken(email);
  const newToken = new TokenModel({
    userId: newWorker?._id,
    token,
  });
  await newToken.save();
  res.status(200).json({ token });
});



Roater.get("/logout", jwtverify, async (req, res) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  await TokenModel.findOneAndDelete({
    token,
  });
  res.status(200).json({ message: "logout success" });
});

module.exports = Roater;
