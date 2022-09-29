const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log("requestProperties: ", requestProperties);
  callback(404, {
    message: "url not found!",
  });
};

module.exports = handler;
