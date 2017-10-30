var express = require('express')
, passport = require('passport')
, BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

app.use(passport.initialize());
// comment/remove this line below to disable auth
app.use(passport.authenticate('basic', { session: false }));
app.use(express.static(__dirname + '/public'));;


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
console.log("Listening on " + port);
});