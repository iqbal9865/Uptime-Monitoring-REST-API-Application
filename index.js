// Title: "Uptime Monitoring Application"
// Description: 'A RESTFull API to monitor up or down time of user desined links'
// Author: 'Iqbal Ahmed'
// Date: '29 September 2022'

// Dependencies
const http = require("http");
const url = require("url");

// app object -  module scaffolding
const app = {};

// configaration
app.config = {
  port: 4000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening to the port number ${app.config.port}`);
  });
};

//handle Request Response
app.handleReqRes = (req, res) => {
  // request handle
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  console.log(trimmedPath);

  // response handle
  res.end("Hello Programmers.Happy Coding!!");
};

//start the server
app.createServer();
