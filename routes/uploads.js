const Router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/profile",
    filename : (req , file , cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}


const upload = multer({
    storage: storage ,
    limits: {
        fileSize: 100000
    }
})


Router.post("/uploadProfile",upload.single("profile"), (req, res) => {
    res.json({
            status : 200,
            message: "Profile Uploaded Successfully",
            url:`http://localhost:3000/uploads/profile/${req.file.filename}`
        })
})


module.exports = {Router,errHandler};