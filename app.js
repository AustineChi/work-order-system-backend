const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');

const assets = require('./routes/assets');
const workOrders = require('./routes/workOrders')
const locations = require('./routes/locations')
const teams = require('./routes/teams')
const parts = require('./routes/parts')
const users = require('./routes/users')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(bodyParser.json());

app.use('/api/assets', assets);
app.use('/api/work/orders', workOrders);
app.use('/api/locations', locations);
app.use('/api/teams', teams);
app.use('/api/parts', parts);
app.use('/api/users', users);


mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
()=>{
console.log("connected to DB")
})


const port = process.env.PORT || 4000;

app.listen(port)

