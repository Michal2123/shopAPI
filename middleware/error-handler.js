const createErrorMessage = (status) => {
  let message;

  switch (status) {
    case 400:
      message = "Bad Request";
      break;
    case 401:
      message = "Unauthorized";
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

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.status);
  if (!err.message) return res.send(createErrorMessage(err.status));
  res.send(err.message);
};

module.exports = errorHandler;
