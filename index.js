require('dotenv').config()
const express = require("express");
const { connect} = require('./config/db');
const Roater = require("./routes/Authentication/auth")
const ProfileRouter = require("./routes/Pictuers/uploads");
const verficationRoute = require("./routes/Authentication/verfication");
const find = require("./routes/Location/find");
const bodyParser=require("body-parser");
const comment = require('./routes/comments/comment');
const profile = require('./routes/profile/profile');
const wilaya = require('./routes/wilaya/wilaya');
const { ChatRouter } = require('./routes/chat/chat');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", Roater);
app.use("/uploads", ProfileRouter);
app.use('/verify', verficationRoute);
app.use("/find",find);
app.use("/comments" , comment)
app.use("/message",ChatRouter)
app.use("/profile",profile)
app.use("/",wilaya)
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





