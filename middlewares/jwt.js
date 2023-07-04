const jwt = require("jsonwebtoken");
const jwtverify = (req, res, next) => {
  const authHead = req.headers?.authorization;
  const token = authHead?.split(" ")[1];
  if (!token) return res.render("index");
  jwt.verify(token, process.env.K, (err, decode) => {
    if (err) return res.render("index");
    if (!decode) {
      return res.status(401).render("index");
    }
    req.user = decode.email;
    next();
  });
};
module.exports = { jwtverify };