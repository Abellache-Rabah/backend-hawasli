const find = require("express").Router();
const jwt = require("jsonwebtoken");
const { WorkerModel } = require("../../models/workerModel");




find.get("/find",async (req, res) => {
  const { longitude, latitude , maxDistance  } = req.body;
  if (!longitude || !latitude || !maxDistance) {
    return res.status(400).json({
      error: "Please provide all the required fields"
    });
  }
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
    maxDistance = parseFloat(maxDistance)

    if (longitude === NaN || latitude === NaN || maxDistance === NaN) {
        return res.status(400).json({
          error: "Please provide all Numbers"
        });
    }

  const workers = await WorkerModel.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance * 1000 // convert km to meters
      }
    }
  });
  res.json(workers);

});

module.exports = find;
