require('dotenv').config()
const express = require("express");
const { connect} = require('./config/db');
const Roater = require("./routes/Authentication/auth")
const ProfileRouter = require("./routes/Pictuers/uploads");
const DownloadRouter = require("./routes/Pictuers/downloadsPictures");
const verficationRoute = require("./routes/Authentication/verfication");
const find = require("./routes/Location/find");
const bodyParser=require("body-parser");
const comment = require('./routes/comments/comment');
const { ChatRouter } = require('./routes/chat/chat');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", Roater);
app.use("/uploads", ProfileRouter);
app.use('/profile', express.static('uploads/profile'));
app.use("/download",DownloadRouter);
app.use('/verify', verficationRoute);
app.use("/find",find);
app.use("/comments" , comment)
app.use("/message",ChatRouter)

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





