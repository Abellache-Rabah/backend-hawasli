const express = require("express");
const { connect} = require('./config/db');
const Roater = require("./routes/auth")
const {Router,errHandler} = require("./routes/uploads");
const bodyParser=require("body-parser")
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", Roater);
app.use("/uploads", Router);
app.use('/profile', express.static('uploads/profile'));
app.use(errHandler);



connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





