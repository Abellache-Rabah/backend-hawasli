const { wilayaModel, cityModel } = require("../models/wilayaModel");

module.exports.getWilaya = async (req, res) => {
  const wilay = await wilayaModel.find({})
  res.send(wilay);
};
module.exports.getBaladia = async (req, res) => {
  const wilaya = req.params?.wilaya;
  const city = await cityModel.find({wilaya_id:wilaya});
  res.send(city);
};
