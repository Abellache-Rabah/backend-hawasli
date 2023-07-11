const wilaya = require('../../controllers/wilayaController');

const router = require('express').Router();

router.route("/wilaya").get(wilaya.getWilaya)
router.route("/baladia/:wilaya?").get(wilaya.getBaladia)
module.exports=router