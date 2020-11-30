/* eslint-disable @typescript-eslint/no-var-requires */
const nodeStatic = require('node-static');
const http = require('http');

const file = new nodeStatic.Server(__dirname + '/../dist');

http
  .createServer(function(req, res) {
    file.serve(req, res);
  })
  .listen(80);
