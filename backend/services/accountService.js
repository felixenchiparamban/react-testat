const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');

const Datastore = require('nedb');

const config = require('../config');
const db = new Datastore(config.inMemory ? {} : { filename: './data/accounts.db', autoload: true });
const dbTransaction = new Datastore(config.inMemory ? {} : { filename: './data/transactions.db', autoload: true });


const resultUtil = require("../util/resultUtil");

db.ensureIndex({ fieldName: 'accountNr', unique: true, sparse: true });


function createTransactionObj(from, target, amount, total, date)
{

  let obj = {from, target, amount, total};
  obj.date = date ? date : new Date();
  return obj;
}

function createAccount(ownerId, accountNr)
{
  let obj = {ownerId, accountNr};
  dbTransaction.insert(createTransactionObj("00000000", accountNr, 1000), ()=> {});
  obj.amount = 1000;
  return obj;
}


function add(ownerId, accountNr, callback) {
  if (!(accountNr && ownerId)) {
    callback(resultUtil.createNotFoundResult());
  }
  db.insert(createAccount(ownerId, accountNr), function (err, newDoc) {
    callback(err, newDoc);
  });
}


function get(accountNr, callback) {
  if (!(accountNr)) {
    callback(resultUtil.createNotFoundResult());
  }

  db.findOne({accountNr}, { _id : 0}, (err, doc) => {
    if(doc == null)
    {
      callback( resultUtil.createNotFoundResult());
      return;
    }
    callback(err, doc);
  });
}

function addTransaction(from, target, amount, date = null, callback) {
  get(from, (err, fromAccount) => {
    get(target, (err, targetAccount) => {
      if (from != target && amount > 0 && fromAccount && fromAccount.amount >= amount && targetAccount) {
        let fromAccountAmount = fromAccount.amount - amount;
        let targetAccountAmount = targetAccount.amount + amount;

        dbTransaction.insert(createTransactionObj(from, target, -amount, fromAccountAmount, date), (err, transactionFrom) => {
          dbTransaction.insert(createTransactionObj(from, target, amount, targetAccountAmount, date), (err, transactionTarget) => {
            db.update({accountNr: from}, {$set: {amount: fromAccountAmount}}, function (err, numAffected, affectedDocuments, upsert) {
              db.update({accountNr: target}, {$set: {amount: targetAccountAmount}}, function (err, numAffected, affectedDocuments, upsert) {
                delete transactionFrom._id;
                callback(null, transactionFrom);
              });
            });
          });
        });
      }
      else {
        callback(resultUtil.createErrorResult());
      }
    })
  });
}

function getTransactions(accountId, count, skip, fromDate, toDate, callback) {
  if (!(count || (fromDate && toDate))) {
    callback(null, {query: {count, skip, fromDate, toDate}, result: []});
    return;
  }

  let find = {
    $or: [
      {
        from: accountId, amount: {$lte: 0}
      },
      {
        target: accountId, amount: {$gte: 0}
      }]
  };

  if (fromDate && toDate) {
    find["$and"] = [
      {date: {$gte: new Date(fromDate)}},
      {date: {$lte: new Date(toDate)}}
    ];
  }

  let query = dbTransaction.find(find, {_id: 0}).sort({date: -1});
  if (skip > 0) {
    query = query.skip(skip);
  }
  if (count > 0) {
    query = query.limit(count);
  }
  dbTransaction.count(find, (err, resultcount) => {
    query.exec((err, docs) => {
      callback(err, {query: {resultcount, count, skip, fromDate, toDate}, result: docs});
    });
  });
}

module.exports = {add, get, addTransaction, getTransactions};
