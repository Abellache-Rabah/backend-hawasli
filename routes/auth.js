const Roater = require('express').Router();
const jwt = require("jsonwebtoken");



Roater.post("/login", (req, res) => {
    console.log(req.body);
    if (!req.body?.email||!req.body?.password) return res.status(401).send({message: "error authent"});
    const { email, password } = req.body;
    const token = jwt.sign({ email }, process.env.K);
    res.json({ token });
  });






module.exports = Roater;