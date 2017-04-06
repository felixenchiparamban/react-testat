
const userService = require("../services/userService");

function register(req, res, next) {
  let {login, firstname, lastname, password} = req.body;
  userService.register(login, firstname, lastname, password, (err, result) => {
    if(err)
    {
      next(err)
    }
    else {
      res.send(result);
    }
  });
}


function login(req, res, next)
{
  let {login, password} = req.body;
  userService.login(login, password, (err, result) => {
    res.send(result);
  });
}

module.exports = {register, login};
