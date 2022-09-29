// dependencies
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
const url = require("url");

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  console.log("method: ", method);
  console.log("trimmedPath: ", trimmedPath);
  console.log("headersObject: ", headersObject);
  console.log("queryStringObject: ", queryStringObject);

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  const decoder = new StringDecoder('utf-8');
  let realData = '';

  const choosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  choosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof(statusCode) === "number" ? statusCode : 500;
    payload = typeof(payload) === "object" ? payload : {};

    const payloadString = JSON.stringify(payload);
    
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log("Real Data: ", realData);

    // response handle
    res.end("Hello Programmers.Happy Coding!!");
  });
};

module.exports = handler;
