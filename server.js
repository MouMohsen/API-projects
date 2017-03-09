var moment = require('moment')
var express = require('express')
var path = require('path')
var app = express()


app.get('/:timestamp', function (req, res) {
  var timestamp
  if (/^\d{8,}$/.test(req.params.timestamp)){
    timestamp = moment(req.params.timestamp, "X");
  }
  else {
    timestamp = moment(req.params.timestamp, "MMMM DD, YYYY");
  }

  if(timestamp.isValid()) {
    res.json({
      unix: timestamp.format("X"),
      natural: timestamp.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
})

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'),function(err){
    if (err){
    console.log(err)
    res.status(err.status).end()
    }
    else {
      console.log("index.html loaded")
    }
  })
})

app.listen(process.env.PORT ||3000, function () {
  console.log('Timestamp API is listening on port 3000!')
})
