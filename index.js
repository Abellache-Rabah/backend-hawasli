require('dotenv').config()
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');




const app = express();
const port = 3000;
app.use(express.json());
const uri = process.env.URI;
const apiRoutes = require('./api-routes');
app.use('/api', apiRoutes);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const connect = async ()=> {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch (error){
    console.log(error)
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


connect().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      
})





