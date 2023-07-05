const jwt = require("jsonwebtoken");
const jwtverify = (req, res, next) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  if (!token) return res.status(401).json({err:"token dont exsist!"});
  jwt.verify(token, process.env.K, (err, decode) => {
    if (err) return res.status(401).json({err})
    if (!decode) {
      return res.status(401).json({err:"token is expire!"})
    }
    req.email = decode.email;
    next();
  });
};
module.exports = { jwtverify };