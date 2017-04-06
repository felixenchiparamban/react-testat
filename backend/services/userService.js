const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');
const resultUtil = require('../util/resultUtil');

const Datastore = require('nedb');

const config = require('../config');
const db = new Datastore(config.inMemory ? {} : { filename: './data/users.db', autoload: true });
const accountService = require('./accountService');


db.ensureIndex({ fieldName: 'login', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'accountNr', unique: true, sparse: true });

let nextNumber = 1000000;


db.count({}, function (err, count) {
  nextNumber = nextNumber + count;
});


function createUserObj(login, firstname, lastname, password)
{
  let obj = {login, firstname, lastname};
  obj.passwordHash = cryptoUtil.hashPwd(password);
  obj.accountNr = ""+ ++nextNumber;
  return obj;
}


function getById(id,callback) {
  db.findOne({_id: id}, {_id: 0, passwordHash: 0}, function (err, doc) {
    callback(!err && doc != null ? null : resultUtil.createNotFoundResult(), doc)
  });
}

function getByLogin(login,callback) {
  db.findOne({login}, { _id : 0, passwordHash : 0}, function (err, doc) {
    callback(!err && doc != null ? null : resultUtil.createNotFoundResult(), doc)
  });
}



function register(login, firstname, lastname, password, callback) {
  if (!(login && firstname && lastname && password)) {
    callback(resultUtil.createErrorResult());
  }

  db.insert(createUserObj(login, firstname, lastname, password), function (err, newDoc) {
    if(!err)
    {
      accountService.add(newDoc._id, newDoc.accountNr, (err, account) => {
        getByLogin(login, callback)
      });
    }
    else {
      callback(resultUtil.createErrorResult(400, err));
    }
  });
}

function login(login, password, callback) {
  if (!(login && password)) {
    callback(false);
  }

  db.findOne({  $or: [{ login: login }, { accountNr: login}] }, function (err, doc) {
    if (doc == null && !err) {
      callback(resultUtil.createErrorResult(400, err));
    }
    else {
      if(doc && doc.passwordHash == cryptoUtil.hashPwd(password))
      {
        let {login, firstname, lastname, accountNr} = doc;
        let user = {login, firstname, lastname, accountNr};
        let token = cryptoUtil.createToken(user, config.jwtSecret, config.signOptions, (err, token) => {
          callback(null, { token : token, owner :  user })
        });
      }
      else {
        callback(resultUtil.createErrorResult())
      }
    }
  });
}

module.exports = {getById, getByLogin,register , login : login};
