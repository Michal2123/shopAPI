const createErrorMessage = (status) => {
  let message;

  switch (status) {
    case 400:
      message = "Bad Request";
      break;
    case 401:
      message = "Unauthorized";
      break;
    case 403:
      message = "Already Exists";
      break;
    case 404:
      message = "Not Found";
      break;
    case 405:
      message = "Method Not Allowed";
      break;
    case 406:
      message = "Not Acceptable";
      break;
    case 500:
      message = "Internal Server Error";
      break;
    default:
      message = "Something went wrong";
      break;
  }
  return message;
};

//Middlewere for error handling
const errorHandler = (err, req, res, next) => {
  console.log(`error-handler: ${err}`);
  if (!err.message) err.message = createErrorMessage(err.status);
  res.sendStatus(err.status) && next(err);
};

module.exports = errorHandler;
