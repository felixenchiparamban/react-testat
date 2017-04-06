const express = require('express');
const router = express.Router();

const accountController = require("../controllers/account");

router.get('/', (req, res, next) =>  accountController.getAccount(req, res, next,req.user.accountNr ));

router.get('/transactions', accountController.getTransactions);
router.post('/transactions', accountController.addTransactions);

router.get('/:accountNr', (req, res, next) =>  accountController.getAccount(req, res, next,req.params.accountNr ));



module.exports = router;
