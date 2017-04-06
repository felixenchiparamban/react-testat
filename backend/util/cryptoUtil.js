const crypto = require('crypto');
const jwt = require('jsonwebtoken');


function hashPwd(pwd){
  return crypto.createHmac('sha256', "secret!") //more information: https://nodejs.org/api/crypto.html
    .update(pwd)
    .digest('hex');
}

function createToken(data, secret, options, callback) {
  jwt.sign(data, secret, options, (err, token) => callback(err, token));
}

module.exports = {hashPwd, createToken};


