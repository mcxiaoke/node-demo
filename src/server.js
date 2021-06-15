const http = require("http");
const url = require("url");

function start(route, handle) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname;
    let data = "";
    req.setEncoding("utf8");
    req.addListener("data", function (chunk) {
      data += chunk;
      console.log("Received data chunk:", chunk);
    });
    req.addListener("end", function () {
      route(handle, pathname, res, data);
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server started at http://localhost:8888");
}

exports.start = start;
