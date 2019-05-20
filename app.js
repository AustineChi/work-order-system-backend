const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const app = express();
const bodyParser = require('body-parser');


const assets = require('./routes/assets');
const workOrders = require('./routes/workOrders')
const locations = require('./routes/locations')

app.use(bodyParser.json());

app.use('/api/assets', assets);
app.use('/api/work/orders', workOrders);
app.use('/api/locations', locations);




mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
()=>{
console.log("connected to DB")
})



const port = process.env.PORT || 4000;

app.listen(port)