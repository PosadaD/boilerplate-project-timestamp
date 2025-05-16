// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res, next) => {

  let getDate = req.params.date
  
  //Verificar si el parametro date no esta vacio
  if(!getDate){
    //Paremetro date vacio, usando la fecha actual
    getDate = new Date();
  }

  //Validar el formato de date
  else if(isNaN(new Date(getDate)) && isNaN(new Date(Number(getDate)))){
    res.json({ error : "Invalid Date" })
  }

  else{
    if(isNaN(new Date(getDate))){
      getDate = parseInt(getDate);
    }
  }

  req.timeUnix = new Date(getDate).getTime();
  req.timeUtc = new Date(getDate).toUTCString();
  
  next()

}, (req, res)=>{
  res.json({
    unix: req.timeUnix,
    utc: req.timeUtc
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
