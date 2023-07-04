const Roater = require("express").Router();
const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../models/workerModel");
const { ConsummerModel } = require("../models/consummerModel");
const { TokenModel } = require("../models/tokenModels");
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt);
    return hash
}


const comparePassword = async (password, hash) => {
   return await bcrypt.compare(password, hash);
}







const createAccessToken = (email) => {
  return jwt.sign({ email }, process.env.K);
};
Roater.post("/login", async (req, res) => {
  if (!req.body?.email || !req.body?.password)
    return res.status(401).send({ message: "error authent" });
  const { email, password } = req.body;
  const token = createAccessToken(email);

  

  const worker = await WorkerModel.findOne({ email, password: hashPassword(password)});
  const consummer = await ConsummerModel.findOne({ email, password: hashPassword(password) });
  
  
  
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

Roater.post("/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!firstname || !lastname || email || password)
    return res.status(401).send({ message: "error authent" });

    const consummer = await ConsummerModel.findOne({ email });
    if (consummer)
    return res.status(401).send({ message: "user already exist" });

    const newConsummer = new ConsummerModel({
        firstname,
        lastname,
        email,
        password: hashPassword(password),
    })
    await newConsummer.save();
    const token = createAccessToken(email)
    const newToken = new TokenModel({
        userId: newConsummer?._id,
        token,
    });
    res.status(200).json({ token });

});

module.exports = Roater;
