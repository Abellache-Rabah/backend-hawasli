const express = require("express");
const { connect} = require('./config/db');
const Roater = require("./routes/auth")
const ProfileRouter = require("./routes/uploads");
const PicturesRouter= require("./routes/uploadsPictures");
const bodyParser=require("body-parser")
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", Roater);
app.use("/uploads", ProfileRouter);
app.use("/uploads", PicturesRouter);
app.use('/profile', express.static('uploads/profile'));



connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





