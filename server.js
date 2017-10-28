var express = require('express'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));


var port = Number(process.env.PORT || 3000);
app.listen(port, function () {
  console.log("Listening on " + port);
});