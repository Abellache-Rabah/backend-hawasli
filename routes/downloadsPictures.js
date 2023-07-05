const { WorkerModel } = require('../models/workerModel');
const path = require('path');

const router = require('express').Router();
router.get("/pictures/:id", async (req,res)=>{
    const userId = req.params.id;
    const worker = await WorkerModel.findById(userId);
    if (worker) {
        const photos = worker.photos ;
    const urls = photos.map(photo => {
        return "http://localhost:3000/download/picture/" + userId + "/" + photo
    } )

        res.status(200).json({urls});
    }else{
        res.status(404).json({message: "User not found"})
    }

})

router.get("/picture/:userid/:picName", async (req,res)=>{ 
    const userId = req.params.userid;
    const picName = req.params.picName;
    const worker = await WorkerModel.findById(userId);
    if (worker) {
        const photos = worker.photos.filter(photo => photo == picName); 
        const url = path.resolve(__dirname, "../uploads/pictures/" + userId + "/" + picName);
        res.sendFile(url)
    }else{
        res.status(404).json({message: "User not found"})
    }



 });	


 module.exports = router;