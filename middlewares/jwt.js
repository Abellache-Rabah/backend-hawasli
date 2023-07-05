const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../models/workerModel");
const jwtverify = (req, res, next) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  if (!token) return res.status(401).json({ err: "token dont exsist!" });
  jwt.verify(token, process.env.K, (err, decode) => {
    if (err) return res.status(401).json({ err });
    if (!decode) {
      return res.status(401).json({ err: "token is expire!" });
    }
    req.email = decode.email;
    next();
  });
};
const isWorker = (req, res, next) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  if (!token) return res.status(401).json({ err: "token dont exsist!" });
  jwt.verify(token, process.env.K, async (err, decode) => {
    if (err) return res.status(401).json({ err });
    if (!decode) {
      return res.status(401).json({ err: "token is expire!" });
    }
    const email = decode.email;
    const worker = await WorkerModel.findOne({ email });
    if (worker) {
      req.email = email
      next();
    } else {
      return res.status(401).json({ err: "you are not worker!" });
    }
  });
};
module.exports = { jwtverify,isWorker };
