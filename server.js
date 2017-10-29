var https = require('https'),
    express = require('express'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    getSSLCertificate = require('../index');


getSSLCertificate = require('../index');

describe('getSSLCertificate.get()', function() {
  var url = 'https://ethercrm.eu';

  var mockCertificate= {
     subject:
       { OU: [ 'Domain Control Validated', 'PositiveSSL Wildcard'  ],
            CN: '*.ethercrm.eu' },
      issuer:
       { C: 'GB',
            ST: 'London',
            L: 'London',
            O: 'COMODO CA Limited',
            CN: 'COMODO RSA Domain Validation Secure Server CA' },
      valid_from: 'October 29 00:00:00 2017 GMT',
      valid_to: 'Aug 22 23:59:59 2018 GMT',
  };
function isEmpty(object) {
  for(var prop in object) {
    if(object.hasOwnProperty(prop))
      return false;
  }

  return true;
}

function get(url) {
  if (url.length <= 0 || typeof url !== 'string') {
    throw Error("A valid URL is required");
  }

  var options = {
    hostname: url, 
    agent: false, 
    rejectUnauthorized: false,
    ciphers: "ALL",
  };
  
  return new Promise(function (resolve, reject) {
    var req = https.get(options, function (res) {
      var certificate = res.socket.getPeerCertificate();
      if(isEmpty(certificate) || certificate === null) {
        reject({message: 'The website did not provide a certificate'});
      } else {
        resolve(certificate);
      }
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.end();
  });
}

module.exports = {
  get: get,
};


var app = express();

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));


var port = Number(process.env.PORT || 3000);
app.listen(port, function () {
  console.log("Listening on " + port);
});