const verficationRoute = require("express").Router();
const jwt = require("jsonwebtoken");
const {hashPassword, comparePassword} = require("../../utils/password")
const { ConsummerModel } = require("../../models/consummerModel");
const { TokenModel } = require("../../models/tokenModels");


const createAccessToken = (email) => {
    return jwt.sign({ email }, process.env.K);
  };


verficationRoute.get("/:token", (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.K, async (err, decoded) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send(
          "Email verification failed, possibly the link is invalid or expired"
        );
    } else {
      const user = decoded.user;
      const hashPwd = await hashPassword(user.password);
      const newConsummer = new ConsummerModel({
        firstName: user.firstName,
        lastName: user.lastName,
        email : user.email,
        password: hashPwd,
        
      });
      await newConsummer.save();
      const token = createAccessToken(user.email);
      const newToken = new TokenModel({
        userId: newConsummer?._id,
        token,
      });
      await newToken.save();
      res.status(200).send( "email verified");
    }
  });
});

module.exports = verficationRoute;
