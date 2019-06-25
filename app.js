const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const assets = require('./routes/asset');
const workOrders = require('./routes/workOrder');
const locations = require('./routes/location');
const teams = require('./routes/team');
const parts = require('./routes/part');
const users = require('./routes/user');
const visitors = require('./routes/visitorsLog');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if(err) req.user = undefined;
      req.user = decode
      next();
    });
  }
  else{
    req.user = undefined;
    next()
  }
})


app.use('/api/assets', assets);
app.use('/api/work/orders', workOrders);
app.use('/api/locations', locations);
app.use('/api/teams', teams);
app.use('/api/parts', parts);
app.use('/api/users', users);
app.use('/api/visitors/log', visitors);

// app.get('/', function(req, res){
//   res.send("hello world")
// })

mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
()=>{
console.log("connected to DB")
})


const port = process.env.PORT || 4000;

app.listen(port)

