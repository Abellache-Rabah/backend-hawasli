require('dotenv').config()
const express = require("express");
const { connect} = require('./config/db');
const Roater = require("./routes/Authentication/auth")
const ProfileRouter = require("./routes/Pictuers/uploads");
const PicturesRouter= require("./routes/Pictuers/uploadsPictures");
const DownloadRouter = require("./routes/Pictuers/downloadsPictures");
const verficationRoute = require("./routes/Authentication/verfication");
const bodyParser=require("body-parser")
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", Roater);
app.use("/uploads", ProfileRouter);
app.use("/uploads", PicturesRouter);
app.use('/profile', express.static('uploads/profile'));
app.use("/download",DownloadRouter);
app.use('/verifynodemailer', verficationRoute);



connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





