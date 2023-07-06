const Roater = require("express").Router();
const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../../models/workerModel");
const { ConsummerModel } = require("../../models/consummerModel");
const { TokenModel } = require("../../models/tokenModels");
const bcrypt = require("bcrypt");
const { jwtverify, isConsummer } = require("../../middlewares/jwt");
const {hashPassword, comparePassword} = require("../../utils/password")
const nodemailer = require("nodemailer")





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
  if(!worker&&!consummer) return res.status(401).send("email dont exsist!")
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
});

Roater.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(401).send({ message: "error authent" });

  const consummer = await ConsummerModel.findOne({ email });
  if (consummer) return res.status(401).send({ message: "user already exist" });

const user = req.body;
  const verfyToken = jwt.sign({
    user ,
}, process.env.K, { expiresIn: '10m' }  
);    
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.USER,
      pass: process.env.PASS
  }
});
  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.USER,
    to: email,
    // Subject of Email
    subject: 'Email Verification',
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           ${process.env.SERVERURL}/verify/${verfyToken} 
           Thanks`    
};
transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    res.status(200).send('Email Sent Successfully');
    console.log(info);
});

  
});

Roater.post("/upgradeToWorker", jwtverify, isConsummer, async (req, res) => {
  const { sex, work, phone, age, wilaya, baladia, latitude, longitude } = req.body;
  if (
    !baladia ||
    !sex ||
    !work ||
    !phone ||
    !age ||
    !wilaya ||
    !latitude || 
    !longitude
  )
    return res
      .status(401)
      .send({ message: "error all fields should be present " });
  const email = req?.email;
  const consummer = ConsummerModel.findOne({ email });
  if (!consummer) {
    return res.status(401).send({ message: "user does not exist" });
  } else {
    const worker = await WorkerModel.findOne({ email });
    if (worker) {
      return res.status(401).send({ message: "you are allready a worker" });
    } else {
      

    }
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !baladia ||
    !sex ||
    !work ||
    !phone ||
    !age ||
    !wilaya
  )
    return res
      .status(401)
      .send({ message: "error all fields should be present " });
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
    baladia,
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
