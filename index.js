// Title: "Uptime Monitoring Application"
// Description: 'A RESTFull API to monitor up or down time of user designed links'
// Author: 'Iqbal Ahmed'
// Date: '29 September 2022'

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helper/handleReqRes");

// app object -  module scaffolding
const app = {};

// configaration
app.config = {
  port: 3000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening to the port number ${app.config.port}`);
  });
};

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();
