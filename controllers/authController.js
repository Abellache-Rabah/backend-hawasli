const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const { TokenModel } = require("../models/tokenModels");

const nodemailer = require("nodemailer");
const {
  loginSchema,
  ConsummerSchema,
  WorkerSchema,
} = require("../utils/validation/joi");

const createAccessToken = (email) => {
  return jwt.sign({ email }, process.env.K);
};

module.exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  const { email, password } = req.body;
  const token = createAccessToken(email);

  const worker = await WorkerModel.findOne({
    email,
  });
  const consummer = await ConsummerModel.findOne({
    email,
  });
  if (!worker && !consummer) return res.status(401).send("email dont exsist!");
  const isAuth = comparePassword(
    password,
    worker?.password || consummer?.password
  );
  if (!isAuth) return res.status(401).send({ message: "user does not exist" });
  const newtoken = new TokenModel({
    userId: worker?._id || consummer?._id,
    token,
  });
  await newtoken.save();
  console.log(token);
  res.json({ token });
};

module.exports.register = async (req, res) => {
  const { error } = ConsummerSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  const { email } = req.body;
  const consummer = await ConsummerModel.findOne({ email });
  if (consummer) return res.status(401).send({ message: "user already exist" });
  const user = req.body;
  const verfyToken = jwt.sign(
    {
      user,
    },
    process.env.K,
    { expiresIn: "10m" }
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.USER,
    to: email,
    // Subject of Email
    subject: "Email Verification",
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           ${process.env.SERVERURL}/verify/${verfyToken} 
           Thanks`,
  };
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    res.status(200).send("Email Sent Successfully");
    console.log(info);
  });
};

module.exports.upgradeToWorker=  async (req, res) => {
  const { error } = WorkerSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  const { latitude, longitude } =
    req.body;
  const email = req?.email;
  const worker = await WorkerModel.findOne({ email });
  if (worker) return res.status(401).send({ message: "user already exist" });
  const consummer = await ConsummerModel.findOne({ email });
  const body = req.body;
  delete body.latitude;
  delete body.longitude;
  console.log(body);
  const newWorker = new WorkerModel({
    ...body,
    email: consummer.email,
    password: consummer.password,
    firstName: consummer.firstName,
    lastName: consummer.lastName,
    "location.type": "Point",
    "location.coordinates": [latitude, longitude],
  });
  await newWorker.save();
  await consummer.deleteOne();
  const token = createAccessToken(email);
  const newToken = new TokenModel({
    userId: newWorker?._id,
    token,
  });
  await newToken.save();
  res.status(200).json({ token });
};

module.exports.logout = async (req, res) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  await TokenModel.findOneAndDelete({
    token,
  });
  res.status(200).json({ message: "logout success" });
};

