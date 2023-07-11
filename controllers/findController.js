const { WorkerModel } = require("../models/workerModel");

module.exports.root =async (req, res) => {
  let { longitude, latitude , maxDistance  } = req.body;
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
          coordinates: [latitude, longitude]
        },
        $maxDistance: maxDistance * 1000 // convert km to meters
      }
    }
  });
  res.json(workers);

};

