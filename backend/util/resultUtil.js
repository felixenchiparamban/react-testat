 function createResult(statusCode = 200, data)
{
  let obj = {statusCode, data};
  return obj;
}

function createErrorResult(statusCode = 400, data)
{
  let obj = {statusCode, data };
  return obj;
}

function createNotFoundResult(statusCode = 404)
{
  let obj = {statusCode };
  return obj;
}


module.exports = {createResult, createErrorResult, createNotFoundResult};


