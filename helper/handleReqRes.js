
// dependencies
const { StringDecoder } = require("string_decoder");
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

  const decoder = new StringDecoder("utf-8");
  let realData = "";

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
