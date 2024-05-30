const express = require ('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const { Result } = require('postcss');
const cors = require('cors');

const app = express();
const port = 8080;
app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';


client.connect();

//get all the passwords
app.get("/", async(req,res)=>{
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

// Save a password
app.post("/", async(req,res)=>{
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
})

//delete a password
app.delete("/", async(req,res)=>{
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult});
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})