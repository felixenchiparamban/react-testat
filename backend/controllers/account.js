const accountService = require("../services/accountService");
const userService = require("../services/userService");

function getAccount(req, res, next, accountNr) {
  accountService.get(accountNr, (err, account) => {
    if (err) {
      next(err);
    }
    else {
      userService.getById(account.ownerId, (err, result) => {
        if (err) {
          next(err);
        }
        else {
          if (req.user.accountNr == accountNr) {
            account.owner = result;
            res.json(account);
          }
          else {

            let {accountNr} = account;
            let {firstname, lastname} = result;
            res.json({accountNr, owner: {firstname, lastname}});
          }
        }
      })
    }
  })
}

function getTransactions(req, res, next) {
  accountService.getTransactions(req.user.accountNr, +req.query.count, +req.query.skip, req.query.fromDate, req.query.toDate, (err, result)=> {
    if (err) {
      next(err);
    }
    else {
      res.json(result);
    }
  });
}

function addTransactions(req, res, next) {
  accountService.addTransaction(req.user.accountNr, req.body.target, req.body.amount, null, (err, result)=> {
    if (err) {
      next(err);
    }
    else {
      res.json(result);
    }
  });
}



module.exports = {getAccount, getTransactions, addTransactions };
